import { Box, Image, Text, VStack, Flex, Divider } from "@chakra-ui/react";
import { DealCardProps } from "../../../types/DealCardProps";

const DealCard: React.FC<DealCardProps> = ({ imageUrl, title, location, dong, floor, price }) => {
  return (
    <Box
      bg="white"
      border="1px solid #E2E8F0"
      borderRadius="16px"
      overflow="hidden"
      boxShadow="md"
      width="280px"
      height="180px"
      display="flex"
    >
      {/* 좌측 이미지 */}
      <Box width="150px" height="100%" overflow="hidden" borderRadius="16px 0 0 16px">
        <Image src={imageUrl} alt={title} objectFit="cover" width="100%" height="100%" />
      </Box>
      {/* 우측 텍스트 */}
      <Flex p={4} flexDirection="column" justifyContent="space-between" width="100%">
        <Text fontSize="lg" fontWeight="bold">
          {title}
        </Text>
        <Text color="gray.500">{dong}동</Text>
        <Text color="gray.500">{floor}층</Text>
        <Text color="gray.700">{price} 만원</Text>
        <Divider my={2} borderColor="gray.300" />
        <Text color="blue.500">{location}</Text>
      </Flex>
    </Box>
  );
};

export default DealCard;
