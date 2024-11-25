import {
  Box,
  HStack,
  Input,
  InputGroup,
  InputRightAddon,
  Skeleton,
  Text,
  VStack,
} from "@chakra-ui/react";
import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { FaSearch } from "react-icons/fa";
import { MdArrowBack, MdClose } from "react-icons/md";
import { useNavigate } from "react-router-dom";
import { getAptInfosByName } from "../../../api/apt";

interface MapSearchProps {
  searchQuery: string;
  onSelectApartment: (apartment: any) => void;
}

export default function MapSearch({ searchQuery, onSelectApartment }: MapSearchProps) {
  const [searchValue, setSearchValue] = useState(searchQuery);
  const navigate = useNavigate();

  const { data, isLoading, isError, refetch } = useQuery({
    queryKey: ["apartments", searchValue],
    queryFn: () => getAptInfosByName(searchValue),
    enabled: !!searchValue,
    retry: 1,
  });

  const handleSearch = () => {
    if (searchValue.trim() !== "") {
      navigate(`/map/search?query=${encodeURIComponent(searchValue)}`);
    }
  };

  const handleBackButton = () => {
    navigate(`/map`);
  };

  return (
    <Box
      position={"absolute"}
      left={"0"}
      top={"0"}
      minW={"358px"}
      minH={"calc(100vh - 88px)"}
      bg={"gray.100"}
      zIndex={1}
      overflowY={"auto"}
    >
      {/* 내부 Input */}
      <InputGroup p={"10px"}>
        <Input
          placeholder="아파트, 지역 검색"
          borderRadius={24}
          borderColor={"#F37021"}
          bg={"white"}
          value={searchValue}
          onChange={(e) => setSearchValue(e.target.value)}
          focusBorderColor="#FF9C60"
          _focus={{
            borderWidth: "1px",
            borderColor: "#FF9C60",
            boxShadow: "none",
          }}
          onKeyDown={(e) => {
            if (e.key === "Enter") {
              handleSearch(); // 엔터 키를 누르면 handleSearch 호출
            }
          }}
        />
        <InputRightAddon
          bg={"#F37021"}
          borderTopEndRadius={24}
          borderBottomEndRadius={24}
          borderColor={"#F37021"}
          px={3}
          onClick={handleSearch}
          cursor={"pointer"}
        >
          <FaSearch size={16} color="#FFFFFF" />
        </InputRightAddon>
      </InputGroup>

      <HStack h={"52px"} bg={"#F37021"} justifyContent={"space-between"}>
        <HStack w={"52px"} justifyContent={"center"} cursor={"pointer"} onClick={handleBackButton}>
          <MdArrowBack size={24} color="white" />
        </HStack>
        <Box>
          <Text fontSize={"18px"} lineHeight={"32px"} color={"white"}>
            {searchQuery} 검색 결과
          </Text>
        </Box>
        <HStack w={"52px"} justifyContent={"center"} cursor={"pointer"} onClick={handleBackButton}>
          <MdClose size={24} color="white" />
        </HStack>
      </HStack>

      {/* 검색 결과 */}
      <VStack
        py={5}
        align={"start"}
        overflowY={"scroll"} // 스크롤 활성화
        maxHeight={"calc(100vh - 140px)"} // 최대 높이 지정 (헤더/패딩 제외)
        w={"100%"}
        className="no-scrollbar"
      >
        <Text fontSize={"14px"} color={"#F4945B"} px={5}>
          아파트
        </Text>
        {isLoading ? (
          <Skeleton height="20px" width="100%" />
        ) : isError ? (
          <Text color="red.500">검색 결과를 가져오는데 실패했습니다.</Text>
        ) : data && data.length > 0 ? (
          data.map((apt) => (
            <VStack
              px={5}
              w={"100%"}
              key={apt.id}
              py={2}
              align={"start"}
              cursor="pointer"
              onClick={() => onSelectApartment(apt)}
              _hover={{
                bg: "gray.200",
              }}
            >
              <Text fontSize={"16px"} color={"#333333"}>
                {apt.name}
              </Text>
              <Text fontSize={"13px"} color={"#888888"}>
                {apt.name || "세부 정보 없음"}
              </Text>
            </VStack>
          ))
        ) : (
          <Text color="gray.500">검색 결과가 없습니다.</Text>
        )}
      </VStack>
    </Box>
  );
}
