import React from "react";
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

const NoticeRegister = () => {
  const toast = useToast();

  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault();

    // 데이터를 수집하고 서버로 전송
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

    // 서버로 전송하는 로직 (임시)
    console.log({ title, content });
    toast({
      title: "등록 성공",
      description: "공지사항이 성공적으로 등록되었습니다.",
      status: "success",
      duration: 3000,
      isClosable: true,
    });
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

          <Button type="submit" colorScheme="blue" size="lg" w="full">
            등록하기
          </Button>
        </Stack>
      </Box>
    </Box>
  );
};

export default NoticeRegister;
