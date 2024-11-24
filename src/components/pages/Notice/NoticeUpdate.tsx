import React, { useEffect, useState } from "react";
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
  Spinner,
} from "@chakra-ui/react";
import { useNavigate, useParams } from "react-router-dom";
import { useQuery, useMutation } from "@tanstack/react-query";
import { getNotice, updateNotice } from "../../../api/notice";

export default function NoticeUpdate() {
  const { id } = useParams<{ id: string }>(); // Get the notice ID from the URL
  const navigate = useNavigate();
  const toast = useToast();

  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");

  // Fetch notice details for editing
  const { data, isLoading, isError, error } = useQuery({
    queryKey: ["notice", id],
    queryFn: () => getNotice(Number(id)),
    enabled: !!id, // Fetch only if ID exists
  });

  // Populate form fields when data is available
  useEffect(() => {
    if (data) {
      setTitle(data.title);
      setContent(data.content);
    }
  }, [data]);

  // Mutation for updating the notice
  const mutation = useMutation({
    mutationFn: (updatedNotice: { title: string; content: string }) =>
      updateNotice(Number(id), updatedNotice),
  });

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();

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
      await mutation.mutateAsync({ title, content });
      toast({
        title: "수정 성공",
        description: "공지사항이 성공적으로 수정되었습니다.",
        status: "success",
        duration: 3000,
        isClosable: true,
      });
      navigate(`/notices/${id}`); // Redirect to the notice detail page
    } catch (mutationError: any) {
      toast({
        title: "수정 실패",
        description: mutationError.message || "공지사항 수정 중 문제가 발생했습니다.",
        status: "error",
        duration: 3000,
        isClosable: true,
      });
    }
  };

  if (isLoading) {
    return (
      <Box mt="88px" textAlign="center">
        <Spinner size="xl" />
        <Heading>Loading...</Heading>
      </Box>
    );
  }

  if (isError) {
    return (
      <Box mt="88px" textAlign="center">
        <Heading>Error: {(error as Error).message}</Heading>
        <Button mt={4} onClick={() => navigate(-1)} colorScheme="gray">
          Go Back
        </Button>
      </Box>
    );
  }

  return (
    <Box maxWidth="600px" mx="auto" mt="88px" p={4}>
      <Heading as="h1" size="lg" textAlign="center" mb={6}>
        공지사항 수정
      </Heading>
      <Box as="form" onSubmit={handleSubmit}>
        <Stack spacing={4}>
          <FormControl isRequired>
            <FormLabel>제목</FormLabel>
            <Input
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder="공지사항 제목을 입력하세요."
              focusBorderColor="blue.500"
            />
          </FormControl>

          <FormControl isRequired>
            <FormLabel>내용</FormLabel>
            <Textarea
              value={content}
              onChange={(e) => setContent(e.target.value)}
              placeholder="공지사항 내용을 입력하세요."
              focusBorderColor="blue.500"
            />
          </FormControl>

          <Button
            type="submit"
            colorScheme="blue"
            size="lg"
            w="full"
            isLoading={mutation.isPending} // Show loading state while updating
          >
            수정하기
          </Button>
        </Stack>
      </Box>
    </Box>
  );
}
