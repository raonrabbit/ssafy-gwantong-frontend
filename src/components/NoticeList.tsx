import { Box, Grid, Heading, HStack, Stack, Text, VStack, Image } from "@chakra-ui/react";
import { FaRegClipboard } from "react-icons/fa";
import { IoIosPaper } from "react-icons/io";

type NoticeCardProps = {
  title: string;
  date: string;
  content: string;
};

function NoticeCard({ title, date, content }: NoticeCardProps) {
  return (
    <Box
      borderWidth="1px"
      borderRadius="16px"
      bg="white"
      boxShadow="md"
      p={10}
      maxW="848px"
      w="full"
    >
      <Stack spacing={3}>
        <HStack spacing={2}>
          <FaRegClipboard size={"46px"} />
          <Box bg={"#F7FAFC"} w={"98px"} textAlign={"center"} borderRadius={24}>
            <Text fontSize="sm" fontWeight={"normal"} lineHeight={"46px"}>
              공지사항
            </Text>
          </Box>
          <Text fontSize="sm" color="#333333">
            {date}
          </Text>
        </HStack>

        <Text fontSize={26} lineHeight={"76px"}>
          {content}
        </Text>
      </Stack>
    </Box>
  );
}

export default function NoticeList() {
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
    <VStack
      maxW={"1712px"}
      marginX={"auto"}
      spacing={20}
      align="stretch"
      bg="gray.100"
      mt={48}
      pb={48}
    >
      <HStack spacing={2} alignItems="center">
        <Image src={"images/Gongji.webp"} h={"78px"} />
        <Heading as="h1" size="lg">
          공지사항
        </Heading>
      </HStack>

      <Grid
        templateColumns={{
          sm: "1fr",
          md: "1fr 1fr",
        }}
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
