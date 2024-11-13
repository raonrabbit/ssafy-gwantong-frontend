import { Box, HStack, Input, InputGroup, InputRightAddon, Text, VStack } from "@chakra-ui/react";
import { FaSearch } from "react-icons/fa";
import { MdArrowBack, MdClose } from "react-icons/md";

export default function MapSearch() {
  return (
    <Box
      position={"absolute"}
      left={"0"}
      top={"0"}
      minW={"358px"}
      minH={"calc(100vh - 88px)"}
      bg={"gray.100"}
      zIndex={1}
    >
      <InputGroup p={"10px"}>
        <Input
          placeholder="아파트, 지역 검색"
          borderRadius={24}
          borderColor={"#F37021"}
          bg={"white"}
          value={"청담자이"}
        />
        <InputRightAddon
          bg={"#F37021"}
          borderTopEndRadius={24}
          borderBottomEndRadius={24}
          borderColor={"#F37021"}
          px={3}
        >
          <FaSearch size={16} color="#FFFFFF" />
        </InputRightAddon>
      </InputGroup>
      <HStack h={"52px"} bg={"#F37021"} justifyContent={"space-between"}>
        <HStack w={"52px"} justifyContent={"center"}>
          <MdArrowBack size={24} color="white" />
        </HStack>
        <Box>
          <Text fontSize={"18px"} lineHeight={"32px"} color={"white"}>
            청담자이 검색 결과
          </Text>
        </Box>
        <HStack w={"52px"} justifyContent={"center"}>
          <MdClose size={24} color="white" />
        </HStack>
      </HStack>
      <VStack p={5} align={"start"}>
        <Text fontSize={"14px"} color={"#F4945B"}>
          아파트
        </Text>
        <VStack py={2} align={"start"}>
          <Text fontSize={"16px"} color={"#333333"}>
            청담동 청담자이
          </Text>
          <Text fontSize={"13px"} color={"#888888"}>
            708세대 2011년 10월 입주
          </Text>
        </VStack>
        <VStack py={2} align={"start"}>
          <Text fontSize={"16px"} color={"#333333"}>
            청담동 청담힐
          </Text>
          <Text fontSize={"13px"} color={"#888888"}>
            30세대 1997년 4월 입주
          </Text>
        </VStack>
        <VStack py={2} align={"start"}>
          <Text fontSize={"16px"} color={"#333333"}>
            청담동 청담르엘
          </Text>
          <Text fontSize={"13px"} color={"#888888"}>
            1,261세대 2025년 11월 입주
          </Text>
        </VStack>
        <VStack py={2} align={"start"}>
          <Text fontSize={"16px"} color={"#333333"}>
            청담동 청담공원
          </Text>
          <Text fontSize={"13px"} color={"#888888"}>
            391세대 2021년 11월 입주
          </Text>
        </VStack>
      </VStack>
    </Box>
  );
}
