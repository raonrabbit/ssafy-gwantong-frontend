import { Box, Grid, Heading, HStack, Stack, Text, VStack, Image } from "@chakra-ui/react";
import { FaRegClipboard } from "react-icons/fa";
import { IoIosPaper } from "react-icons/io";
import NoticeCard from "./HomeNoticeCard";
import { Link } from "react-router-dom";

type NoticeCardProps = {
  title: string;
  date: string;
  content: string;
};

export default function HomeNoticeList() {
  const notices: NoticeCardProps[] = [
    {
      title: "공지사항",
      date: "2024.11.06",
      content: "이번주는 정말 힘든 하루인 것 같습니다.",
    },
    {
      title: "공지사항",
      date: "2024.11.04",
      content: "vue는 너무 어려워요... 알고 계셨나요?",
    },
    {
      title: "공지사항",
      date: "2024.11.06",
      content: "이번주는 정말 힘든 하루인 것 같습니다.",
    },
    {
      title: "공지사항",
      date: "2024.11.04",
      content: "vue는 너무 어려워요... 알고 계셨나요?",
    },
  ];

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
        {notices.map((notice, index) => (
          <NoticeCard
            key={index}
            title={notice.title}
            date={notice.date}
            content={notice.content}
          />
        ))}
      </Grid>
    </VStack>
  );
}
