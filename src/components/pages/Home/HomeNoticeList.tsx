import { Grid, Heading, HStack, Stack, Text, VStack, Image } from "@chakra-ui/react";
import { useQuery } from "@tanstack/react-query";
import NoticeCard from "./HomeNoticeCard";
import { Link } from "react-router-dom";
import { getRecentNotices } from "../../../api/notice";

type NoticeCardProps = {
  title: string;
  id: string;
  content: string;
  createdAt: string;
};

export default function HomeNoticeList() {
  // Fetch recent notices using React Query
  const {
    data: notices,
    isLoading,
    isError,
    error,
  } = useQuery({
    queryKey: ["recentNotices"],
    queryFn: getRecentNotices,
  });

  return (
    <VStack maxW={"1712px"} marginX={"auto"} align="stretch" mt={48} pb={48} gap={0}>
      <HStack justifyContent={"space-between"}>
        <HStack alignItems="center">
          <Image src={"images/Gongji.webp"} h={"78px"} />
          <Heading as="h1" size="lg">
            공지사항
          </Heading>
        </HStack>
        <Link to={"/notices"}>
          <Text fontSize={"14px"}>목록 보기</Text>
        </Link>
      </HStack>

      <Grid
        templateColumns={{
          sm: "1fr",
          md: "1fr 1fr",
        }}
        mt={10}
        gap={4}
        w="full"
        mx="auto"
      >
        {notices?.map((notice) => (
          <Link to={`/notices/${notice.id}`} key={notice.id}>
            <NoticeCard
              key={notice.id}
              title={notice.title}
              date={notice.createdAt}
              content={notice.content}
            />
          </Link>
        ))}
      </Grid>
    </VStack>
  );
}
