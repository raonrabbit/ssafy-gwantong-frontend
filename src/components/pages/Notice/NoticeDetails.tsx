import {
  Box,
  Text,
  Image,
  Heading,
  Stack,
  Button,
  Divider,
  IconButton,
  HStack,
  Spinner,
  useToast,
} from "@chakra-ui/react";
import { useNavigate, useParams } from "react-router-dom";
import { useMutation, useQuery } from "@tanstack/react-query";
import { getNotice, deleteNotice } from "../../../api/notice";
import { FaFacebook, FaTwitter, FaLink } from "react-icons/fa";
import { useSelector } from "react-redux";
import { useState } from "react";
import NoticeDeleteModal from "./NoticeDeleteModal";

const NoticeDetails = () => {
  const navigate = useNavigate();
  const toast = useToast();
  const { id } = useParams<{ id: string }>(); // Get the notice ID from the URL
  const [isModalOpen, setModalOpen] = useState(false);

  // Fetch user object from Redux once
  const user = useSelector((state: any) => state.auth?.user);

  // Safely extract email from user
  const reduxUserEmail = user?.email || "";

  // Fetch notice details
  const { data, isLoading, isError, error } = useQuery({
    queryKey: ["notice", id], // React Query cache key
    queryFn: () => getNotice(Number(id)), // API call
    enabled: !!id, // Execute only if ID is present
  });

  // Delete notice mutation
  const deleteMutation = useMutation({
    mutationFn: () => deleteNotice(Number(id)),
    onSuccess: () => {
      toast({
        title: "삭제 성공",
        description: "공지사항이 성공적으로 삭제되었습니다.",
        status: "success",
        duration: 3000,
        isClosable: true,
      });
      navigate("/notices");
    },
    onError: (error: any) => {
      toast({
        title: "삭제 실패",
        description: error?.message || "공지사항 삭제 중 문제가 발생했습니다.",
        status: "error",
        duration: 3000,
        isClosable: true,
      });
    },
  });

  const handleDelete = () => {
    deleteMutation.mutate();
    setModalOpen(false);
  };

  if (isLoading) {
    return (
      <Box mt="88px" textAlign="center">
        <Spinner size="xl" />
        <Text mt={4}>Loading...</Text>
      </Box>
    );
  }

  if (isError) {
    return (
      <Box mt="88px" textAlign="center">
        <Text color="red.500">Failed to load notice details.</Text>
        <Text>{(error as Error).message}</Text>
        <Button mt={4} onClick={() => navigate(-1)} colorScheme="gray" variant="outline">
          Go Back
        </Button>
      </Box>
    );
  }

  if (!data) {
    return (
      <Box mt="88px" textAlign="center">
        <Text color="red.500">Notice not found.</Text>
        <Button mt={4} onClick={() => navigate(-1)} colorScheme="gray" variant="outline">
          Go Back
        </Button>
      </Box>
    );
  }
  const canEdit = data?.author.email === reduxUserEmail;
  return (
    <Box mt="88px" maxWidth="800px" mx="auto" px={4} textAlign="center">
      <Heading as="h1" fontSize="3xl" mb={2}>
        {data.title}
      </Heading>
      <Text fontSize="sm" color="gray.500" mb={4}>
        뉴스 | {new Date(data.createdAt).toLocaleDateString()}
      </Text>

      <Image
        src={"https://via.placeholder.com/800x400"} // Placeholder image
        alt={data.title}
        borderRadius="md"
        mb={6}
      />

      <Box textAlign="left" lineHeight="1.8" mb={6}>
        <Text>{data.content}</Text>
      </Box>

      <Divider mb={6} />

      <HStack justifyContent="center" spacing={4} mb={6}>
        {data.tags?.map((tag, index) => (
          <Text key={index} fontSize="sm" color="blue.500">
            {tag}
          </Text>
        ))}
      </HStack>

      <HStack justifyContent="center" spacing={4} mb={6}>
        <IconButton
          icon={<FaFacebook />}
          aria-label="Share on Facebook"
          variant="outline"
          borderRadius="full"
        />
        <IconButton
          icon={<FaTwitter />}
          aria-label="Share on Twitter"
          variant="outline"
          borderRadius="full"
        />
        <IconButton
          icon={<FaLink />}
          aria-label="Copy Link"
          variant="outline"
          borderRadius="full"
        />
      </HStack>
      <HStack justifyContent={canEdit ? "space-between" : "center"}>
        {canEdit && ( // Show "수정하기" button if the user can edit
          <HStack>
            {" "}
            <Button
              colorScheme="blue"
              variant="solid"
              borderRadius="md"
              onClick={() => navigate(`/notices/${id}/edit`)} // Navigate to the edit page
            >
              수정하기
            </Button>
            <Button colorScheme="red" borderRadius={"md"} onClick={() => setModalOpen(true)}>
              삭제하기
            </Button>
          </HStack>
        )}

        <Button
          onClick={() => navigate(-1)} // Navigate back
          colorScheme="gray"
          variant="outline"
          borderRadius="md"
        >
          목록으로 돌아가기
        </Button>
      </HStack>

      {/* Delete Confirmation Modal */}
      <NoticeDeleteModal
        isOpen={isModalOpen}
        onClose={() => setModalOpen(false)}
        onConfirm={handleDelete}
        isLoading={deleteMutation.isPending}
      />
    </Box>
  );
};

export default NoticeDetails;
