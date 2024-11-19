import { Box, HStack, Input, InputGroup, InputRightAddon, Text, VStack } from "@chakra-ui/react";
import { FaSearch } from "react-icons/fa";
import { MdArrowBack, MdClose } from "react-icons/md";

interface MapSearchProps {
  searchQuery: string;
  onSelectApartment: (apartment: any) => void;
}

export default function MapSearch({ searchQuery, onSelectApartment }: MapSearchProps) {
  const apartments = [
    { id: 1, name: "청담자이", details: "708세대 2011년 10월 입주" },
    { id: 2, name: "청담힐", details: "30세대 1997년 4월 입주" },
    { id: 3, name: "청담르엘", details: "1,261세대 2025년 11월 입주" },
  ];

  const filteredApartments = apartments.filter((apt) => apt.name.includes(searchQuery));

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
      {/* 내부 Input */}
      <InputGroup p={"10px"}>
        <Input
          placeholder="아파트, 지역 검색"
          borderRadius={24}
          borderColor={"#F37021"}
          bg={"white"}
          value={searchQuery}
          isReadOnly
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
            {searchQuery} 검색 결과
          </Text>
        </Box>
        <HStack w={"52px"} justifyContent={"center"}>
          <MdClose size={24} color="white" />
        </HStack>
      </HStack>

      {/* 검색 결과 */}
      <VStack p={5} align={"start"}>
        <Text fontSize={"14px"} color={"#F4945B"}>
          아파트
        </Text>
        {filteredApartments.map((apt) => (
          <VStack
            key={apt.id}
            py={2}
            align={"start"}
            cursor="pointer"
            onClick={() => onSelectApartment(apt)}
          >
            <Text fontSize={"16px"} color={"#333333"}>
              {apt.name}
            </Text>
            <Text fontSize={"13px"} color={"#888888"}>
              {apt.details}
            </Text>
          </VStack>
        ))}
      </VStack>
    </Box>
  );
}
