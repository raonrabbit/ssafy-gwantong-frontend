import React, { useState, useEffect } from "react";
import {
  Box,
  Button,
  VStack,
  Input,
  HStack,
  Text,
  IconButton,
  Tooltip,
  useColorModeValue,
} from "@chakra-ui/react";
import { ChatIcon, CloseIcon } from "@chakra-ui/icons";
import { localAxios } from "../../../api/http-commons";

const ChatbotButton: React.FC = () => {
  const [messages, setMessages] = useState<{ sender: string; text: string }[]>(() => {
    const savedMessages = sessionStorage.getItem("chatMessages");
    return savedMessages ? JSON.parse(savedMessages) : [];
  });
  const [input, setInput] = useState("");
  const [isOpen, setIsOpen] = useState(false);

  const toggleChat = () => setIsOpen(!isOpen);

  const axios = localAxios();

  const sendMessage = async () => {
    if (!input.trim()) return;

    const userMessage = { sender: "user", text: input };
    const updatedMessages = [...messages, userMessage];
    setMessages(updatedMessages);
    sessionStorage.setItem("chatMessages", JSON.stringify(updatedMessages)); // 저장

    setInput("");

    try {
      const response = await axios.post<{ reply: string }>("/chatbot", { message: input });
      console.log("Response:", response);

      const botMessage = { sender: "bot", text: response.data.reply };
      const newMessages = [...updatedMessages, botMessage];
      setMessages(newMessages);
      sessionStorage.setItem("chatMessages", JSON.stringify(newMessages)); // 저장
    } catch (error: any) {
      console.error("Error:", error);

      const errorMessage = {
        sender: "bot",
        text: error.response?.data?.message || "Error: Could not get a response.",
      };
      const newMessages = [...updatedMessages, errorMessage];
      setMessages(newMessages);
      sessionStorage.setItem("chatMessages", JSON.stringify(newMessages)); // 저장
    }
  };

  // 다크모드 및 라이트모드 색상 설정
  const headerBg = useColorModeValue("#F37021", "orange.300");
  const chatBg = useColorModeValue("white", "gray.700");
  const chatInputBg = useColorModeValue("gray.50", "gray.600");
  const userChatBg = useColorModeValue("orange.100", "orange.500"); // 사용자 메시지 배경
  const aiChatBg = useColorModeValue("gray.200", "gray.700"); // 챗봇 메시지 배경
  const chatColor = useColorModeValue("black", "white");

  return (
    <Box position="fixed" bottom="30px" right="30px">
      {!isOpen ? (
        <Tooltip label="부동산 용어를 물어보세요!" placement="top" hasArrow>
          <IconButton
            icon={<ChatIcon />}
            colorScheme="orange"
            isRound
            width="80px"
            height="50px"
            size="lg"
            onClick={toggleChat}
            aria-label="Open Chat"
            boxShadow="0px 2px 4px rgba(0, 0, 0, 0.3)"
          />
        </Tooltip>
      ) : (
        <Box
          w="500px"
          h="800px"
          bg={chatBg}
          boxShadow="md"
          borderRadius="24px"
          display="flex"
          flexDirection="column"
        >
          <HStack
            justifyContent="space-between"
            p="4"
            bg={headerBg}
            color="white"
            borderTopRadius="md"
          >
            <Text fontWeight="bold">이집어때 Bot</Text>
            <IconButton
              icon={<CloseIcon />}
              size="sm"
              variant="ghost"
              onClick={toggleChat}
              aria-label="Close Chat"
            />
          </HStack>
          <VStack spacing="2" align="start" overflowY="auto" flex="1" p="2" bg={chatInputBg}>
            {messages.map((msg, index) => (
              <Box
                key={index}
                alignSelf={msg.sender === "user" ? "flex-end" : "flex-start"}
                bg={msg.sender === "user" ? userChatBg : aiChatBg}
                p="2"
                borderRadius="md"
                maxW="80%"
              >
                {msg.text}
              </Box>
            ))}
          </VStack>
          <HStack p="4" borderTop="1px solid #ddd">
            <Input
              placeholder="헷갈리는 부동산 용어를 물어보세요!"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              bg={chatInputBg}
              color="chatColor"
            />
            <Button colorScheme="orange" onClick={sendMessage}>
              Send
            </Button>
          </HStack>
        </Box>
      )}
    </Box>
  );
};

export default ChatbotButton;
