import { Box, HStack, Stack, Text, useColorModeValue } from "@chakra-ui/react";
import { FaRegClipboard } from "react-icons/fa";

type NoticeCardProps = {
  title: string;
  date: string;
  content: string;
};

export default function HomeNoticeCard({ title, date, content }: NoticeCardProps) {
  const cardBox = useColorModeValue("white", "gray.700");
  const cardTagContent = useColorModeValue("#F7FAFC", "gray.500");
  const cardDateContent = useColorModeValue("#333333", "gray.400");
  return (
    <Box
      borderWidth="1px"
      borderRadius="16px"
      bg={cardBox}
      boxShadow="md"
      p={10}
      maxW="848px"
      w="full"
    >
      <Stack spacing={3}>
        <HStack spacing={2}>
          <FaRegClipboard size={"46px"} />
          <Box bg={cardTagContent} w={"98px"} textAlign={"center"} borderRadius={24}>
            <Text fontSize="sm" fontWeight={"normal"} lineHeight={"46px"}>
              공지사항
            </Text>
          </Box>
          <Text fontSize="sm" color={cardDateContent}>
            {date}
          </Text>
        </HStack>

        <Text fontSize={26} lineHeight={"76px"}>
          {title}
        </Text>
      </Stack>
    </Box>
  );
}
