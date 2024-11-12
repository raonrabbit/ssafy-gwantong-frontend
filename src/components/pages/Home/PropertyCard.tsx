import {
  Box,
  Heading,
  HStack,
  Image,
  Stack,
  Text,
  VStack,
  useColorModeValue,
} from "@chakra-ui/react";
import { MdOutlineApartment } from "react-icons/md";
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
  const cardBox = useColorModeValue("white", "gray.700");
  const cardTagContent = useColorModeValue("#F7FAFC", "gray.500");
  return (
    <Box borderRadius="24px" bg={cardBox} boxShadow="md" maxWidth={"416"}>
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
        <HStack justifyContent={"space-between"}>
          <HStack spacing={2}>
            <MdOutlineApartment fill="#1F1F1F" size={24} />
            <Box w={"62px"} bg={cardTagContent} textAlign={"center"} borderRadius={24}>
              <Text lineHeight={8} fontSize="sm">
                아파트
              </Text>
            </Box>
            <Box w={"62px"} bg={cardTagContent} textAlign={"center"} borderRadius={24}>
              <Text lineHeight={8} fontSize="sm">
                매매
              </Text>
            </Box>
            <Box w={"62px"} bg={cardTagContent} textAlign={"center"} borderRadius={24}>
              <Text lineHeight={8} fontSize="sm">
                48평
              </Text>
            </Box>
          </HStack>
          <FiBookmark size={24} cursor={"pointer"} />
        </HStack>
        <VStack justifyContent={"space-between"} align={"start"} h={"100%"}>
          <VStack align={"start"} mt={3}>
            <Text fontSize={"26px"} lineHeight={9}>
              {title}
            </Text>
            <Text fontWeight="bold" fontSize={"17px"} lineHeight={9}>
              {price}
            </Text>
            <Text fontWeight={"thin"} fontSize="sm" lineHeight={9}>
              {details}
            </Text>
          </VStack>
          <Text color="#666666" fontSize="xs">
            {location}
          </Text>
        </VStack>
      </Stack>
    </Box>
  );
}
