import { Box, Button, Grid, Heading, HStack, Image, Stack, Text, VStack } from "@chakra-ui/react";
import { FaNewspaper } from "react-icons/fa";
import { AiOutlineBulb } from "react-icons/ai";

type NewsCardProps = {
  imageUrl: string;
  title: string;
  date: string;
  description: string;
  author: string;
};

function NewsCard({ imageUrl, title, date, description, author }: NewsCardProps) {
  return (
    <Box
      maxW="sm"
      borderWidth="1px"
      borderRadius="24px"
      overflow="hidden"
      bg="white"
      boxShadow="md"
      p={4}
    >
      <Stack spacing={3}>
        {/* Header with Icon, Title, and Date */}
        <HStack spacing={2}>
          <AiOutlineBulb color="orange" />
          <Text fontSize="sm" fontWeight="bold">
            보도자료
          </Text>
          <Text fontSize="sm" color="gray.500">
            {date}
          </Text>
        </HStack>

        {/* News Title */}
        <Heading as="h3" size="md" fontWeight="bold">
          {title}
        </Heading>

        {/* Description */}
        <Text fontSize="sm" color="gray.700">
          {description}
        </Text>

        {/* Author and Image */}
        <Text fontSize="xs" color="gray.500" fontStyle="italic">
          ✒️ {author}
        </Text>
        <Image src={imageUrl} alt={title} borderRadius="lg" />
      </Stack>
    </Box>
  );
}

export default function NewsSection() {
  // Array of news data
  const newsData: NewsCardProps[] = [
    {
      imageUrl: "/images/news1.png",
      title: "한중우, 아직도 3박 4일 예비군 기간 중 2일차 밖에 안됐다는데 사실 알고 계셨나요?",
      date: "2024.11.04",
      description: "모두 다 함께 그에게 힘내라고 외쳐주세요!",
      author: "한중우 라이브로 군복무 중",
    },
    {
      imageUrl: "/images/news1.png",
      title: "한중우, 아직도 3박 4일 예비군 기간 중 2일차 밖에 안됐다는데 사실 알고 계셨나요?",
      date: "2024.11.04",
      description: "모두 다 함께 그에게 힘내라고 외쳐주세요!",
      author: "한중우 라이브로 군복무 중",
    },
    {
      imageUrl: "/images/news1.png",
      title: "한중우, 아직도 3박 4일 예비군 기간 중 2일차 밖에 안됐다는데 사실 알고 계셨나요?",
      date: "2024.11.04",
      description: "모두 다 함께 그에게 힘내라고 외쳐주세요!",
      author: "한중우 라이브로 군복무 중",
    },
    // Add more news data as needed
  ];

  return (
    <VStack
      maxWidth={"1712px"}
      mt={48}
      spacing={8}
      align="stretch"
      bg="gray.100"
      p={8}
      marginX={"auto"}
    >
      {/* Section Header */}
      <HStack spacing={2} alignItems="center">
        <FaNewspaper color="orange" />
        <Heading as="h1" size="lg">
          오늘의 뉴스
        </Heading>
      </HStack>

      {/* News Card Grid */}
      <Grid templateColumns="repeat(auto-fill, minmax(300px, 1fr))" gap={6} w="full">
        {newsData.map((news, index) => (
          <NewsCard
            key={index}
            imageUrl={news.imageUrl}
            title={news.title}
            date={news.date}
            description={news.description}
            author={news.author}
          />
        ))}
      </Grid>

      {/* Footer Section with Additional News */}
      <VStack spacing={4} align="stretch" p={4}>
        <Box bg="white" borderRadius="md" p={4} boxShadow="sm">
          <HStack spacing={2}>
            <AiOutlineBulb color="orange" />
            <Text fontSize="sm" fontWeight="bold">
              보도자료
            </Text>
            <Text fontSize="sm" color="gray.500">
              2024.11.04
            </Text>
          </HStack>
          <Text fontSize="sm" color="gray.700" mt={2}>
            최준혁, 알고리즘 푸는데 인상 찌푸리며 고통을 받고 있다는 사실 알고 계셨나요? 준혁도지
            화이팅!
          </Text>
        </Box>

        {/* Footer Buttons */}
        <HStack spacing={4} justifyContent="center" pt={4}>
          <Button variant="outline" colorScheme="orange">
            전체뉴스
          </Button>
          <Button variant="outline" colorScheme="orange">
            아파트뉴스
          </Button>
          <Button variant="outline" colorScheme="orange">
            참고자료
          </Button>
        </HStack>
      </VStack>
    </VStack>
  );
}
