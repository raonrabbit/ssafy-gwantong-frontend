import { useQuery } from "@tanstack/react-query";
import { Box, Stack, Text, Image, Button, HStack, useColorModeValue } from "@chakra-ui/react";
import { useState, useEffect } from "react";
import { getNotices } from "../../../api/notice";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";

interface Author {
  active: boolean;
  admin: boolean;
  createdAt: string;
  email: string;
  id: number;
  nickname: string;
  profileImageUrl: string;
  role: string;
  status: string;
  updatedAt: string;
}

interface Notice {
  id: number;
  createdAt: string;
  updatedAt: string;
  title: string;
  content: string;
  author: Author;
}

const NoticeList = () => {
  const [page, setPage] = useState(1); // 페이지 상태
  const [notices, setNotices] = useState<Notice[]>([]); // 공지사항 목록 상태
  const [hasMore, setHasMore] = useState(true);

  const boxBgColor = useColorModeValue("white", "gray.700");
  const bgColor = useColorModeValue("gray.50", "gray.800");
  const buttonColor = useColorModeValue("#1F1F1F", "gray.600");
  const hoverColor = useColorModeValue("blackAlpha.700", "gray.400");

  // Check token and user from localStorage
  const localStorageToken = localStorage.getItem("token");
  const localStorageUser = localStorage.getItem("user");

  // Check token and user from Redux
  const reduxToken = useSelector((state: any) => state.auth?.token);
  const reduxUser = useSelector((state: any) => state.auth?.user);

  // Determine authentication status
  const isAuthenticated = Boolean(localStorageToken || localStorageUser || reduxToken || reduxUser);

  const { data, isLoading, isError, error, isFetching } = useQuery({
    queryKey: ["notices", page],
    queryFn: () => getNotices(page),
    staleTime: 5 * 60 * 1000, // 데이터 캐시 유효 시간: 5분
  });

  // 데이터를 가져올 때 상태 업데이트
  useEffect(() => {
    if (data) {
      setNotices((prev) => (page === 1 ? data : [...prev, ...data]));
      if (data.length === 0) setHasMore(false);
    }
  }, [data, page]);

  const handleLoadMore = () => {
    setPage((prev) => prev + 1); // 페이지 증가
  };

  if (isLoading && page === 1) return <Text>Loading...</Text>;
  if (isError) return <Text>Error: {error?.message}</Text>;

  return (
    <Box maxWidth="1296px" mx="auto" mt={5} p={5} bgColor={boxBgColor} borderRadius={"24px"}>
      <HStack justifyContent={"space-between"}>
        <Text fontSize="2xl" fontWeight="bold">
          공지사항
        </Text>
        {isAuthenticated && (
          <Link to={`/notices/register`}>
            <Text fontSize={"14px"}>등록하기</Text>
          </Link>
        )}
      </HStack>
      <Stack spacing={0}>
        {notices.map((notice) => (
          <Link to={`/notices/${notice.id}`} key={notice.id}>
            <Stack
              key={notice.id}
              direction="row"
              alignItems="center"
              spacing={4}
              borderBottom="1px solid"
              borderColor="gray.200"
              py={4}
              _hover={{
                bgColor: bgColor,
              }}
            >
              <Box>
                <Text fontSize="sm" color="gray.500" mb={1}>
                  {new Date(notice.createdAt).toLocaleDateString()}
                </Text>
                <Text fontSize="lg" fontWeight="bold" mb={1}>
                  {notice.title}
                </Text>
                <Text fontSize="sm" color="gray.600" noOfLines={2}>
                  {notice.content}
                </Text>
              </Box>
            </Stack>
          </Link>
        ))}
      </Stack>
      {hasMore && (
        <HStack justifyContent={"space-between"} mt={5}>
          <Button
            borderRadius={24}
            backgroundColor={buttonColor}
            size="lg"
            mx="auto"
            color={"white"}
            w={"200px"}
            _hover={{
              backgroundColor: hoverColor,
            }}
            onClick={handleLoadMore}
            isLoading={isFetching}
          >
            더보기
          </Button>
        </HStack>
      )}
    </Box>
  );
};

export default NoticeList;
