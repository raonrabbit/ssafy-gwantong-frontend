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
} from "@chakra-ui/react";
import { useNavigate, useParams } from "react-router-dom";
import { FaFacebook, FaTwitter, FaLink } from "react-icons/fa";

interface NoticeDetailProps {
  date: string;
  title: string;
  imageUrl: string;
  content: string;
  tags: string[];
}

const dummyData: NoticeDetailProps = {
  date: "2024년 11월 18일",
  title: "카카오, '베이비춘식이' 크리스마스 굿즈 출시",
  imageUrl: "https://via.placeholder.com/800x400", // 실제 이미지 URL로 변경
  content: `카카오프렌즈가 ‘베이비춘식이’ 크리스마스 굿즈를 새롭게 출시했다고 18일 밝혔다.
  
  이번 굿즈는 크리스마스를 맞아 출시된 특별한 라인업으로, 다양한 캐릭터와 소품을 활용하여 귀여운 느낌을 강조한 제품들로 구성됐다. 특히, 크리스마스 트리 장식 세트, 캐릭터 인형, 그리고 겨울 테마의 데코 아이템 등으로 카카오프렌즈의 독창적인 매력을 담았다.
  
  카카오프렌즈 관계자는 "이번 베이비춘식이 크리스마스 굿즈는 고객들에게 따뜻한 크리스마스 분위기를 전할 수 있는 좋은 아이템"이라며, "특히 크리스마스 시즌 선물로 많은 사랑을 받을 것으로 기대된다"고 전했다.
  
  해당 굿즈는 카카오프렌즈 공식 스토어와 주요 온라인 마켓에서 구매 가능하며, 12월 25일까지 한정 판매 예정이다.`,
  tags: ["#카카오프렌즈", "#춘식이", "#크리스마스 굿즈"],
};

const NoticeDetail = () => {
  const navigate = useNavigate();
  const { id } = useParams(); // 공지사항 ID 가져오기 (라우팅 필요)

  // 실제로는 ID를 기반으로 데이터를 API에서 가져오거나 React Query로 관리
  const { date, title, imageUrl, content, tags } = dummyData;

  return (
    <Box mt="88px" maxWidth="800px" mx="auto" px={4} textAlign="center">
      <Heading as="h1" fontSize="3xl" mb={2}>
        {title}
      </Heading>
      <Text fontSize="sm" color="gray.500" mb={4}>
        뉴스 | {date}
      </Text>

      <Image src={imageUrl} alt={title} borderRadius="md" mb={6} />

      <Box textAlign="left" lineHeight="1.8" mb={6}>
        <Text>{content}</Text>
      </Box>

      <Divider mb={6} />

      <HStack justifyContent="center" spacing={4} mb={6}>
        {tags.map((tag, index) => (
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

      <Button
        onClick={() => navigate(-1)} // 이전 페이지로 이동
        colorScheme="gray"
        variant="outline"
        borderRadius="md"
      >
        목록으로 돌아가기
      </Button>
    </Box>
  );
};

export default NoticeDetail;
