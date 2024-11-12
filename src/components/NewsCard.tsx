import { Box, HStack, Image, Text, VStack } from "@chakra-ui/react";
import { IoIosMegaphone } from "react-icons/io";

type NewsCardProps = {
  imageUrl: string;
  title: string;
  date: string;
  description: string;
  author: string;
};

export default function NewsCard({ imageUrl, title, date, description, author }: NewsCardProps) {
  return (
    <VStack
      maxW="sm"
      borderWidth="1px"
      borderRadius="24px"
      overflow="hidden"
      bg="white"
      boxShadow="md"
      maxWidth={"560px"}
      gap={0}
    >
      <VStack p={10} align={"start"} h={"375px"} justifyContent={"space-between"}>
        <Box>
          <HStack spacing={2}>
            <IoIosMegaphone size={"46px"} color="#F3B021" />
            <Box bg={"#F7FAFC"} w={"98px"} textAlign={"center"} borderRadius={24}>
              <Text fontSize="sm" fontWeight={"normal"} lineHeight={"46px"}>
                보도자료
              </Text>
            </Box>
            <Text fontSize="sm" color="#333333">
              {date}
            </Text>
          </HStack>

          <Text pt={5} fontSize={"30px"} fontWeight="bold" lineHeight={1.4}>
            {title}
          </Text>
        </Box>
        <Box>
          <Text fontSize="sm" color="gray.700">
            {description}
          </Text>
          <Text fontSize="xs" color="gray.500" fontStyle="italic">
            ✒️ {author}
          </Text>
        </Box>
      </VStack>
      <Image w={"100%"} maxH={"314px"} src={imageUrl} alt={title} />
    </VStack>
  );
}
