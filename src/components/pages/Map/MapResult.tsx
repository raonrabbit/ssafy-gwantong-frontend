import React, { useState } from "react";
import {
  Box,
  Button,
  HStack,
  Input,
  InputGroup,
  InputRightAddon,
  Menu,
  MenuButton,
  MenuItem,
  MenuList,
  Select,
  Text,
  VStack,
  Flex,
  Grid,
} from "@chakra-ui/react";

import { FaSearch, FaRegHeart } from "react-icons/fa";
import { MdArrowBack, MdArrowDropDown } from "react-icons/md";
import { IoIosArrowDown } from "react-icons/io";
import TradeChart from "./TradeChart";
import TradeList from "./TradeList";
export default function MapResult() {
  const [isOn, setIsOn] = useState(true);

  const handleToggle = () => {
    setIsOn(!isOn);
  };
  return (
    <Box
      position={"absolute"}
      left={"0"}
      top={"0"}
      minW={"358px"}
      height={"calc(100vh - 88px)"}
      bg={"gray.100"}
      zIndex={1}
      overflowY={"auto"}
      sx={{
        "&::-webkit-scrollbar": {
          width: "8px", // Change the width of the scrollbar
        },
        "&::-webkit-scrollbar-thumb": {
          backgroundColor: "#FF9C60", // Set the color of the scrollbar thumb
          borderRadius: "10px", // Rounded corners for the thumb
        },
        "&::-webkit-scrollbar-track": {
          backgroundColor: "rgba(0, 0, 0, 0.1)", // Set the background of the track
          borderRadius: "10px", // Rounded corners for the track
        },
        "&": {
          msOverflowStyle: "none", // For IE and Edge (older versions)
          scrollbarWidth: "thin", // For Firefox (set to thin or auto)
        },
      }}
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
      <HStack justifyContent={"center"} bg={"#F37021"} borderBottom={"1px solid #FF9C60"}>
        <Text fontSize={"14px"} lineHeight={"27px"} color={"#533B0C"}>
          서울특별시 강남구 청담동 134-38
        </Text>
      </HStack>
      <HStack h={"40px"} bg={"#F37021"} gap={0}>
        {/* <HStack px={5}> 
          <Box>
            <Text fontSize={"16px"} color={"white"} lineHeight={"32px"}>
              매매
            </Text>
          </Box>
          <HStack>
            <IoIosArrowDown size={24} color="white" />
          </HStack>
        </HStack> */}
        {/* <Select variant={"unstyled"} color={"white"} paddingLeft={5} border={"none"}>
            <option
              value="매매"
              style={{
                color: "#1F1F1F",
                paddingLeft: "20px",
                background: "#F37021",
                pointerEvents: "none",
                border: "none",
              }}
            >
              매매
            </option>
            <option
              value="전/월세"
              style={{
                color: "#1F1F1F",
                paddingLeft: "20px",
                background: "#F37021",
                pointerEvents: "none",
                border: "none",
              }}
            >
              전/월세
            </option>
          </Select> */}
        <Menu>
          <MenuButton
            colorScheme={"customOrange"}
            as={Button}
            rightIcon={<IoIosArrowDown size={24} color="white" />}
            bg="#F37021"
            color="white"
            borderRadius={0}
            minW={"119px"}
            borderRight={"1px solid #FF9C60"}
          >
            매매
          </MenuButton>
          <MenuList minWidth="110px" bg="#F37021" color="white" border="none">
            <MenuItem bg={"#F37021"} _hover={{ bg: "#C14F1B" }}>
              매매
            </MenuItem>
            <MenuItem bg={"#F37021"} _hover={{ bg: "#C14F1B" }}>
              전/월세
            </MenuItem>
          </MenuList>
        </Menu>
        <Menu>
          <MenuButton
            colorScheme={"customOrange"}
            as={Button}
            rightIcon={<IoIosArrowDown size={24} color="white" />}
            bg="#F37021"
            color="white"
            borderRadius={0}
            minW={"119px"}
            borderRight={"1px solid #FF9C60"}
          >
            21평
          </MenuButton>
          <MenuList minWidth="110px" bg="#F37021" color="white" border="none">
            <MenuItem bg={"#F37021"} _hover={{ bg: "#C14F1B" }}>
              21평
            </MenuItem>
            <MenuItem bg={"#F37021"} _hover={{ bg: "#C14F1B" }}>
              35평
            </MenuItem>
            <MenuItem bg={"#F37021"} _hover={{ bg: "#C14F1B" }}>
              46평
            </MenuItem>
            <MenuItem bg={"#F37021"} _hover={{ bg: "#C14F1B" }}>
              58평
            </MenuItem>
          </MenuList>
        </Menu>
        <HStack minW={"119px"} justifyContent={"center"}>
          <FaRegHeart size={24} color="white" cursor={"pointer"} />
        </HStack>
      </HStack>
      <VStack py={5} mt={"5px"} bg={"white"} gap={0}>
        <HStack px={5} justifyContent={"space-between"} w={"100%"}>
          <Flex
            as="button"
            onClick={handleToggle}
            borderRadius="full"
            bg="gray.200"
            alignItems="center"
            justifyContent="space-between"
            w="100px"
            cursor="pointer"
            h={"25px"}
            paddingX={"1px"}
          >
            <Box
              w="50%"
              textAlign="center"
              borderRadius="full"
              bg={isOn ? "#FF9C60" : "transparent"}
              color={isOn ? "white" : "black"}
            >
              <Text fontSize="12px" lineHeight={"21px"}>
                매매
              </Text>
            </Box>
            <Box
              w="50%"
              textAlign="center"
              borderRadius="full"
              bg={!isOn ? "#FF9C60" : "transparent"}
              color={!isOn ? "white" : "black"}
            >
              <Text fontSize="12px" lineHeight={"21px"}>
                전월세
              </Text>
            </Box>
          </Flex>
          <Menu>
            <MenuButton
              border={"1px solid #FF9C60"}
              bg={"white"}
              color={"#FF9C60"}
              as={Button}
              rightIcon={<MdArrowDropDown size={17} />}
              _hover={{ bg: "white", color: "#FF9C60" }}
              fontSize={"12px"}
              h={"25px"}
              maxW={"45px"}
              paddingLeft={1}
              paddingRight={0}
            >
              21평
            </MenuButton>
            <MenuList minW={"45px"} fontSize={"12px"}>
              <MenuItem>21평</MenuItem>
              <MenuItem>35평</MenuItem>
              <MenuItem>46평</MenuItem>
              <MenuItem>58평</MenuItem>
            </MenuList>
          </Menu>
        </HStack>
        <HStack justifyContent={"space-between"} minW={"358px"} px={5} mt={4}>
          <VStack justifyContent={"space-between"} align={"start"}>
            <Text color={"#FF9C60"} fontSize={"15px"} lineHeight={"17px"}>
              최근 실거래 기준 1개월 평균
            </Text>
            <Text color={"#F37021"} fontSize={"18px"} fontWeight={"bold"} lineHeight={"25px"}>
              21억 2700
            </Text>
          </VStack>
          <VStack justifyContent={"space-between"} lineHeight={"17px"} align={"end"}>
            <Text color={"#1F1F1F"} fontSize={"12px"}>
              매물 가격 평균
            </Text>
            <Text color={"#1F1F1F"} fontSize={"16px"} fontWeight={"bold"} lineHeight={"25px"}>
              21억 5600
            </Text>
          </VStack>
        </HStack>
        <Grid mt={4} templateColumns={"repeat(3, 1fr)"} minW={"358px"}>
          <Box textAlign={"center"} borderBottom={"3px solid #1F1F1F"} cursor={"pointer"}>
            <Text lineHeight={"46px"}>최근 3년</Text>
          </Box>
          <Box textAlign={"center"} borderBottom={"1px solid #1F1F1F"} cursor={"pointer"}>
            <Text lineHeight={"46px"}>전체 기간</Text>
          </Box>
          <Box textAlign={"center"} borderBottom={"1px solid #1F1F1F"} cursor={"pointer"}>
            <Text lineHeight={"46px"}>매매/전세</Text>
          </Box>
        </Grid>
        <TradeChart />
        <TradeList />
      </VStack>
    </Box>
  );
}
<style></style>;
