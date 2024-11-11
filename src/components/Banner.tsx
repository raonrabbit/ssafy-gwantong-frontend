import { Box, Image, Stack, Text, VStack, HStack } from "@chakra-ui/react";
import { FaArrowCircleRight } from "react-icons/fa";

export default function Banner() {
  return (
    <Stack direction={"row"} maxW={"1712px"} marginX={"auto"} pt={6}>
      <Box w={"1424px"} h={"808px"} borderRadius={"36px"} position={"relative"}>
        {/* <HStack position={"absolute"} left={0} top={0} w={"100%"} h={"68px"} >
          <Box w={"calc(100% - 180px)"} h={"68px"}></Box>
          <Box bg={"gray.100"} w={"180px"} h={"68px"}></Box>
        </HStack> */}
        <Box
          right={0}
          top={0}
          position={"absolute"}
          w={"180px"}
          h={"68px"}
          bg={"gray.100"}
          borderBottomLeftRadius={"24px"}
        >
          <Stack
            flexDirection={"row"}
            justifyContent="center"
            alignItems="center"
            h={"100%"}
            marginY={"auto"}
          >
            <Text fontSize="16px" fontWeight="bold" display="flex" alignItems="center">
              지도 보러 가기
            </Text>
            <FaArrowCircleRight size={24} cursor={"pointer"} />
          </Stack>
        </Box>
        <Box right={"178px"} top={"-2px"} position={"absolute"} w={"38px"} h={"38px"}>
          <Image src="/images/polygon1.svg"></Image>
        </Box>
        <Box right={"-2px"} top={"66px"} position={"absolute"} w={"38px"} h={"38px"}>
          <Image src="/images/polygon1.svg"></Image>
        </Box>
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
        <VStack
          w={"272px"}
          h={"238px"}
          p={"4"}
          borderRadius={"24px"}
          bg={"white"}
          justifyContent={"space-between"}
        >
          <Box bg={"#1F1F1F"} w={"180px"} borderRadius={"24px"} textAlign={"center"}>
            <Text fontSize={16} color={"white"} lineHeight={"32px"}>
              우리 서비스는?
            </Text>
          </Box>
          <Text fontSize={16} color={"#1F1F1F"}>
            가을의 낙엽이 떨어지듯 우리 회사 주식도 배앰.. 한번만 살려주세요
          </Text>
          <Text fontSize={12} color={"#2E2E2E"}>
            #부동산은 이집어때 #가을 좋아
          </Text>
        </VStack>
        <VStack w={"272px"} h={"285px"} borderRadius={"24px"} bg={"white"} p={4}>
          <VStack justifyContent={"flex-start"} gap={0}>
            <Image h={"30px"} src="/images/Crown.webp" />
            <Text lineHeight={"16px"} fontSize={16} fontWeight={"bold"}>
              인기지역
            </Text>
          </VStack>
          <VStack w={"100%"} h={"100%"} justifyContent={"space-between"} pt={4}>
            <Box
              px={4}
              bg={"#EEEEEE"}
              w={"100%"}
              textAlign={"center"}
              borderRadius={12}
              boxShadow={"inset 0px 1px 4px rgba(0, 0, 0, 0.25)"}
            >
              <Text fontSize={16} fontWeight={"bold"} lineHeight={"48px"}>
                1. 서울 강남구
              </Text>
            </Box>
            <Box
              px={4}
              bg={"#EEEEEE"}
              w={"100%"}
              textAlign={"center"}
              borderRadius={12}
              boxShadow={"inset 0px 1px 4px rgba(0, 0, 0, 0.25)"}
            >
              <Text fontSize={16} fontWeight={"bold"} lineHeight={"48px"}>
                2. 서울 송파구
              </Text>
            </Box>
            <Box
              px={4}
              bg={"#EEEEEE"}
              w={"100%"}
              textAlign={"center"}
              borderRadius={12}
              boxShadow={"inset 0px 1px 4px rgba(0, 0, 0, 0.25)"}
            >
              <Text fontSize={16} fontWeight={"bold"} lineHeight={"48px"}>
                3. 서울 서초구
              </Text>
            </Box>
          </VStack>
        </VStack>
      </VStack>
    </Stack>
  );
}
