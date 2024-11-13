import { Box, HStack, Input, InputGroup, InputRightAddon, Text, VStack } from "@chakra-ui/react";
import { FaSearch } from "react-icons/fa";
import { MdArrowBack, MdClose } from "react-icons/md";
import { IoIosArrowDown } from "react-icons/io";

export default function MapResult() {
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
            청담자이
          </Text>
        </Box>
        <HStack w={"52px"} justifyContent={"center"}></HStack>
      </HStack>
      <HStack justifyContent={"center"} bg={"#F37021"}>
        <Text fontSize={"14px"} lineHeight={"27px"} color={"#533B0C"}>
          서울특별시 강남구 청담동 134-38
        </Text>
      </HStack>
      <HStack h={"45px"} bg={"#F37021"}>
        <HStack px={5}>
          <Box>
            <Text fontSize={"16px"} color={"white"} lineHeight={"32px"}>
              매매
            </Text>
          </Box>
          <HStack>
            <IoIosArrowDown size={24} color="white" />
          </HStack>
        </HStack>
      </HStack>
    </Box>
  );
}
