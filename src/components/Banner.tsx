import { Box, Image, Stack, Text, VStack } from "@chakra-ui/react";

export default function Banner() {
  return (
    <Stack direction={"row"} maxW={"1712px"} marginX={"auto"}>
      <Box w={"1424px"} h={"808px"} borderRadius={"36px"} bg={"white"}>
        <Image src="/images/banner.png" borderRadius={"36px"}></Image>
      </Box>
      <VStack w={"272px"} h={"808px"} justifyContent={"space-between"}>
        <Box w={"272px"} h={"272px"} borderRadius={"24px"} bg={"#F37021"} textAlign={"center"}>
          <Text fontSize={"24px"} fontWeight={"700"} mt={20}>
            거래 가능한 부동산 건 수
          </Text>
          <Text fontSize={"32px"} fontWeight={"700"} mt={4}>
            2,100,000 건
          </Text>
        </Box>
        <Box w={"272px"} h={"340px"} p={"5"} borderRadius={"24px"} bg={"white"}></Box>
        <Box w={"272px"} h={"164px"} borderRadius={"24px"} bg={"white"}></Box>
      </VStack>
    </Stack>
  );
}
