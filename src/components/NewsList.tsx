import { Box, Text, Grid, Heading, HStack, Image, VStack } from "@chakra-ui/react";
import { IoIosMegaphone } from "react-icons/io";
import { FaArrowCircleRight } from "react-icons/fa";
import NewsCard from "./NewsCard";

type NewsCardProps = {
  imageUrl: string;
  title: string;
  date: string;
  description: string;
  author: string;
};

export default function NewsList() {
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
  ];

  return (
    <VStack maxWidth={"1712px"} mt={48} gap={20} align="stretch" bg="gray.100" marginX={"auto"}>
      <HStack alignItems="center">
        <Image height={"78px"} src="/images/News.webp"></Image>
        <Heading as="h1" size="lg">
          오늘의 뉴스
        </Heading>
      </HStack>

      <Grid
        templateColumns={{
          sm: "1fr",
          md: "1fr 1fr",
          lg: "repeat(3, 1fr)",
        }}
        gap={4}
      >
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

      <VStack align="stretch">
        <Grid
          templateColumns={{
            sm: "1fr",
            lg: "1fr 1fr",
          }}
          gap={4}
        >
          <Box bg="white" borderRadius="24px" boxShadow="sm" p={9}>
            <HStack spacing={2}>
              <IoIosMegaphone size={"46px"} color="#F3B021" />
              <Box bg={"#F7FAFC"} w={"98px"} textAlign={"center"} borderRadius={24}>
                <Text fontSize="sm" fontWeight={"normal"} lineHeight={"46px"}>
                  보도자료
                </Text>
              </Box>
              <Text fontSize="sm" color="#333333">
                2024.11.04
              </Text>
            </HStack>
            <Text fontSize="26px" mt={3}>
              최준혁, 알고리즘 푸는데 인상 찌푸리며 고통을 받고 있다는 사실 알고 계셨나요? 준혁도지
              화이팅!
            </Text>
          </Box>
          <Box bg="white" borderRadius="24px" boxShadow="sm" p={9}>
            <HStack spacing={2}>
              <IoIosMegaphone size={"46px"} color="#F3B021" />
              <Box bg={"#F7FAFC"} w={"98px"} textAlign={"center"} borderRadius={24}>
                <Text fontSize="sm" fontWeight={"normal"} lineHeight={"46px"}>
                  보도자료
                </Text>
              </Box>
              <Text fontSize="sm" color="#333333">
                2024.11.04
              </Text>
            </HStack>
            <Text fontSize="26px" mt={3}>
              최준혁, 알고리즘 푸는데 인상 찌푸리며 고통을 받고 있다는 사실 알고 계셨나요? 준혁도지
              화이팅!
            </Text>
          </Box>
        </Grid>

        <Grid
          templateColumns={{
            sm: "1fr",
            lg: "repeat(3, 1fr)",
          }}
          gap={4}
        >
          <HStack justifyContent={"space-between"} p={9} bg={"white"} borderRadius={24}>
            <Box>
              <Text lineHeight={"38px"} fontSize={"26px"}>
                전체뉴스
              </Text>
            </Box>
            <HStack>
              <Text fontSize={"17px"}>바로가기</Text>
              <FaArrowCircleRight fill="#F37021" size={24} />
            </HStack>
          </HStack>
          <HStack justifyContent={"space-between"} p={9} bg={"white"} borderRadius={24}>
            <Box>
              <Text lineHeight={"38px"} fontSize={"26px"}>
                아파트뉴스
              </Text>
            </Box>
            <HStack>
              <Text fontSize={"17px"}>바로가기</Text>
              <FaArrowCircleRight fill="#F37021" size={24} />
            </HStack>
          </HStack>
          <HStack justifyContent={"space-between"} p={9} bg={"white"} borderRadius={24}>
            <Box>
              <Text lineHeight={"38px"} fontSize={"26px"}>
                참고자료
              </Text>
            </Box>
            <HStack>
              <Text fontSize={"17px"}>바로가기</Text>
              <FaArrowCircleRight fill="#F37021" size={24} />
            </HStack>
          </HStack>
        </Grid>
      </VStack>
    </VStack>
  );
}
