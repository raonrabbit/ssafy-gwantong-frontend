import { Box, Grid, Heading, HStack, Stack, Text, VStack } from "@chakra-ui/react";
import { FaRegCalendarAlt } from "react-icons/fa";
import { IoIosPaper } from "react-icons/io";

type NoticeCardProps = {
  title: string;
  date: string;
  content: string;
};

function NoticeCard({ title, date, content }: NoticeCardProps) {
  return (
    <Box borderWidth="1px" borderRadius="16px" bg="white" boxShadow="md" p={4} maxW="md" w="full">
      <Stack spacing={3}>
        {/* Header with Icon, Title, and Date */}
        <HStack spacing={2}>
          <IoIosPaper size="20px" color="black" />
          <Text fontSize="sm" fontWeight="bold">
            {title}
          </Text>
          <Text fontSize="sm" color="gray.500">
            {date}
          </Text>
        </HStack>

        {/* Notice Content */}
        <Text fontSize="sm" color="gray.700">
          {content}
        </Text>
      </Stack>
    </Box>
  );
}

export default function NoticeList() {
  // Array of notice data
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
    // Add more notices as needed
  ];

  return (
    <VStack
      maxW={"1712px"}
      marginX={"auto"}
      spacing={8}
      align="stretch"
      bg="gray.100"
      p={8}
      mt={48}
    >
      {/* Section Header */}
      <HStack spacing={2} alignItems="center">
        <FaRegCalendarAlt size="24px" color="black" />
        <Heading as="h1" size="lg">
          공지사항
        </Heading>
      </HStack>

      {/* Notice Card Grid */}
      <Grid
        templateColumns="repeat(auto-fill, minmax(300px, 1fr))"
        gap={6}
        maxW="1200px"
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
