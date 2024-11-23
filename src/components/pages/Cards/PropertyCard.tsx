import { Box, Image, Text, VStack } from "@chakra-ui/react";
import { PropertyCardProps } from "./PropertyCardProps";

const PropertyCard: React.FC<PropertyCardProps> = ({ imageUrl, title, location }) => {
  return (
    <Box
      bg="white"
      border="1px solid #E2E8F0"
      borderRadius="24px"
      overflow="hidden"
      boxShadow="md"
      width="200px"
      height="200px"
    >
      <Box overflow={"hidden"} maxH="100px">
        <Image src={imageUrl} alt={title} />
      </Box>
      <VStack p={4} align="flex-start">
        <Text fontSize="lg" fontWeight="bold">
          {title}
        </Text>
        <Text color="blue.500">{location}</Text>
      </VStack>
    </Box>
  );
};

export default PropertyCard;
