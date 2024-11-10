import { Box, Heading, HStack, Image, Stack, Text, VStack } from "@chakra-ui/react";
import { FaBuilding } from "react-icons/fa";
import { FiBookmark } from "react-icons/fi";

type PropertyCardProps = {
  imageUrl: string;
  title: string;
  price: string;
  details: string;
  location: string;
};

export default function PropertyCard({
  imageUrl,
  title,
  price,
  details,
  location,
}: PropertyCardProps) {
  return (
    <Box maxW="sm" borderWidth="1px" borderRadius="24px" bg="white" boxShadow="md" maxWidth={"416"}>
      <Box
        position={"relative"}
        overflow={"hidden"}
        borderTopLeftRadius={"24"}
        borderTopRightRadius={"24"}
        maxH={"234"}
      >
        <Image src={imageUrl} alt={title} objectFit={"cover"} />
      </Box>
      <Stack spacing={2} p={10} h={"303"}>
        <HStack spacing={2}>
          <FaBuilding />
          <Text fontSize="sm">아파트</Text>
          <Text fontSize="sm">매매</Text>
          <Text fontSize="sm">48평</Text>
          <FiBookmark />
        </HStack>
        <Heading as="h3" size="md">
          {title}
        </Heading>
        <Text fontWeight="bold" fontSize="lg">
          {price}
        </Text>
        <Text color="gray.500" fontSize="sm">
          {details}
        </Text>
        <Text color="gray.500" fontSize="xs">
          {location}
        </Text>
      </Stack>
    </Box>
  );
}
