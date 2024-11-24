import React, { useState } from "react";
import {
  Box,
  FormControl,
  FormLabel,
  Input,
  Textarea,
  Button,
  Stack,
  Heading,
  useToast,
} from "@chakra-ui/react";
import { saveNotice } from "../../../api/notice"; // Import the saveNotice API function
import { useNavigate } from "react-router-dom";

const NoticeRegister = () => {
  const toast = useToast();
  const navigate = useNavigate();
  const [isSubmitting, setIsSubmitting] = useState(false); // Loading state

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();

    const formData = new FormData(event.target as HTMLFormElement);
    const title = formData.get("title") as string;
    const content = formData.get("content") as string;

    if (!title || !content) {
      toast({
        title: "입력 오류",
        description: "모든 필드를 채워주세요.",
        status: "error",
        duration: 3000,
        isClosable: true,
      });
      return;
    }

    try {
      setIsSubmitting(true); // Start loading
      await saveNotice(title, content); // Save notice via API
      toast({
        title: "등록 성공",
        description: "공지사항이 성공적으로 등록되었습니다.",
        status: "success",
        duration: 3000,
        isClosable: true,
      });
      navigate("/notices"); // Navigate to the notices page
    } catch (error: any) {
      toast({
        title: "등록 실패",
        description: error.message || "공지사항 등록 중 문제가 발생했습니다.",
        status: "error",
        duration: 3000,
        isClosable: true,
      });
    } finally {
      setIsSubmitting(false); // Stop loading
    }
  };

  return (
    <Box maxWidth="600px" mx="auto" mt="88px" p={4}>
      <Heading as="h1" size="lg" textAlign="center" mb={6}>
        공지사항 등록
      </Heading>
      <Box as="form" onSubmit={handleSubmit}>
        <Stack spacing={4}>
          <FormControl isRequired>
            <FormLabel>제목</FormLabel>
            <Input
              name="title"
              placeholder="공지사항 제목을 입력하세요."
              focusBorderColor="blue.500"
            />
          </FormControl>

          <FormControl isRequired>
            <FormLabel>내용</FormLabel>
            <Textarea
              name="content"
              placeholder="공지사항 내용을 입력하세요."
              focusBorderColor="blue.500"
            />
          </FormControl>

          <Button
            type="submit"
            colorScheme="blue"
            size="lg"
            w="full"
            isLoading={isSubmitting} // Show loading state
          >
            등록하기
          </Button>
        </Stack>
      </Box>
    </Box>
  );
};

export default NoticeRegister;
