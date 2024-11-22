import { Box, Stack, Text, Image, useColorModeValue, Button, HStack } from "@chakra-ui/react";
import { Link } from "react-router-dom";

interface NoticeItem {
  date: string;
  title: string;
  tags: string[];
  imageUrl?: string;
}

const notices: NoticeItem[] = [
  {
    date: "2024.11.19",
    title: "카카오, 비즈니스 연속성 경영시스템 'ISO 22301' 인증 획득",
    tags: ["#인프라", "#비즈니스연속성", "#ISO", "#국제인증"],
    imageUrl: "https://via.placeholder.com/150",
  },
  {
    date: "2024.11.18",
    title: "카카오톡 선물하기, 이탈리아 명품 브랜드 '프라다' 신규 입점",
    tags: ["#카카오톡 선물하기", "#선물하기 Lux", "#프라다 입점"],
    imageUrl: "https://via.placeholder.com/150",
  },
  {
    date: "2024.11.18",
    title: "카카오, '베이비춘식이' 크리스마스 굿즈 출시",
    tags: ["#카카오프렌즈", "#춘식이", "#크리스마스 굿즈"],
    imageUrl: "https://via.placeholder.com/150",
  },
  {
    date: "2024.11.13",
    title: "카카오 준법감시위원회, '투자 및 감사 준칙' 정립 발표",
    tags: ["#준법감시위원회", "#투자 및 감사 준칙"],
    imageUrl: "https://via.placeholder.com/150",
  },
  {
    date: "2024.11.13",
    title: "최애와 카카오톡 오픈채팅에서 소통해요! 팬미팅 '팬톡회' 3회 진행",
    tags: ["#팬톡회", "#카카오톡 오픈채팅", "#팬과의 소통"],
    imageUrl: "https://via.placeholder.com/150",
  },
];

const NoticeList = () => {
  const boxBgColor = useColorModeValue("white", "gray.700");
  const bgColor = useColorModeValue("gray.50", "gray.800");
  const color = useColorModeValue("gray.500", "white");
  const buttonColor = useColorModeValue("#1F1F1F", "gray.600");
  return (
    <Box maxWidth="1296px" mx="auto" mt={5} p={5} bgColor={boxBgColor} borderRadius={"24px"}>
      <HStack justifyContent={"space-between"}>
        <Text fontSize="2xl" fontWeight="bold">
          공지사항
        </Text>
        <Link to={`/notices/register`}>
          <Text fontSize={"14px"}>등록하기</Text>
        </Link>
      </HStack>
      <Stack spacing={0}>
        {notices.map((notice, index) => (
          <Link to={`/notices/${index}`}>
            <Stack
              key={index}
              direction="row"
              alignItems="center"
              spacing={4}
              borderBottom="1px solid"
              borderColor="gray.200"
              py={4}
              _hover={{
                bgColor: bgColor,
                color: color,
              }}
            >
              {notice.imageUrl && (
                <Image
                  src={notice.imageUrl}
                  alt={notice.title}
                  boxSize="100px"
                  objectFit="cover"
                  borderRadius="md"
                />
              )}
              <Box>
                <Text fontSize="sm" color="gray.500" mb={1}>
                  {notice.date}
                </Text>
                <Text fontSize="lg" fontWeight="bold" mb={1}>
                  {notice.title}
                </Text>
                <Stack direction="row" spacing={2}>
                  {notice.tags.map((tag, tagIndex) => (
                    <Text key={tagIndex} fontSize="sm" color="blue.500">
                      {tag}
                    </Text>
                  ))}
                </Stack>
              </Box>
            </Stack>
          </Link>
        ))}
      </Stack>
      <HStack justifyContent={"space-between"} mt={5}>
        <Button
          borderRadius={24}
          backgroundColor={buttonColor}
          size="lg"
          mx="auto"
          color={"white"}
          w={"200px"}
        >
          더보기
        </Button>
      </HStack>
    </Box>
  );
};

export default NoticeList;
