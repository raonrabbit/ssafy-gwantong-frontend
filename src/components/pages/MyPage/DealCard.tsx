import { Box, Image, Text, VStack } from "@chakra-ui/react";
import { DealCardProps } from "../../../types/DealCardProps";

const DealCard: React.FC<DealCardProps> = ({ imageUrl, title, location, dong, floor, price }) => {
  return (
    <Box
      bg="white"
      border="1px solid #E2E8F0"
      borderRadius="24px"
      overflow="hidden"
      boxShadow="md"
      width="200px"
      height="250px"
    >
      <Box overflow={"hidden"} maxH="125px">
        <Image src={imageUrl} alt={title} />
      </Box>
      <VStack p={4} align="flex-start">
        <Text fontSize="lg" fontWeight="bold">
          {title}
        </Text>
        <Text color="gray.500">
          {dong}동 {floor}층 {price}만원
        </Text>
        <Text color="blue.500">{location}</Text>
      </VStack>
    </Box>
  );
};

export default DealCard;
