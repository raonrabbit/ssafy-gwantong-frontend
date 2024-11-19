import { Box, Button, Divider, Grid, Image, Text } from "@chakra-ui/react";
import { Link } from "react-router-dom";
import PropertyCard from "./PropertyCard";
import DealCard from "./DealCard";
import { PropertyCardProps } from "../../../types/PropertyCardProps";
import { DealCardProps } from "../../../types/DealCardProps";

export default function Bookmark() {
  const propertyCards: PropertyCardProps[] = [
    {
      imageUrl: "/images/property1.png",
      title: "청담 자이",
      price: "평균 21억 7,600",
      details: "2014년 준공",
      location: "서울 강남구 뭐시기동",
    },
    {
      imageUrl: "/images/property2.png",
      title: "타워팰리스",
      price: "평균 21억 7,600",
      details: "2014년 준공",
      location: "서울 강남구 뭐시기동",
    },
    {
      imageUrl: "/images/property1.png",
      title: "청담 자이",
      price: "평균 21억 7,600",
      details: "2014년 준공",
      location: "서울 강남구 뭐시기동",
    },
    {
      imageUrl: "/images/property2.png",
      title: "타워팰리스",
      price: "평균 21억 7,600",
      details: "2014년 준공",
      location: "서울 강남구 뭐시기동",
    },
    {
      imageUrl: "/images/property1.png",
      title: "청담 자이",
      price: "평균 21억 7,600",
      details: "2014년 준공",
      location: "서울 강남구 뭐시기동",
    },
    {
      imageUrl: "/images/property2.png",
      title: "타워팰리스",
      price: "평균 21억 7,600",
      details: "2014년 준공",
      location: "서울 강남구 뭐시기동",
    },
  ];

  const dealCards: DealCardProps[] = [
    {
      imageUrl: "/images/property1.png",
      title: "청담 자이",
      price: "21,000",
      dong: "101",
      floor: "10",
      location: "서울 강남구 뭐시기동",
    },
    {
      imageUrl: "/images/property2.png",
      title: "농담곰하우스",
      price: "28,000",
      dong: "105",
      floor: "10",
      location: "경기도 화성시 자시기동",
    },
  ];

  return (
    <Box style={{ alignItems: "center" }} py={8}>
      {/* 관심 아파트 Section */}
      <Box
        bg="white"
        width="700px"
        height="auto"
        boxShadow="0px 4px 24px #0000001E"
        borderRadius="24px"
        mx="auto"
        mb={8}
      >
        <Box>
          <Box
            display="flex"
            justifyContent="space-between"
            width="100%"
            alignItems="center"
            borderBottom="2px solid #DDDDDD"
            p={4}
          >
            <Box display="flex" alignItems="center">
              <Image
                src="/images/heart.webp"
                width="32px"
                height="32px"
                mr="12px"
                style={{
                  filter: "drop-shadow(0px 2px 4px rgba(0, 0, 0, 0.2))",
                }}
              />
              <Text fontSize="16px" fontWeight="bold">
                찜
              </Text>
            </Box>
            <Box>
              <Link to="/bookmark">
                <Button fontSize="14px" colorScheme={"customOrange"} borderRadius={"24px"}>
                  관심 Page 가기
                </Button>
              </Link>
            </Box>
          </Box>
        </Box>
        <Box>
          <Box display="flex" justifyContent="space-between" width="100%" alignItems="center" p={4}>
            <Box display="flex" alignItems="center">
              <Text fontSize="16px" fontWeight="bold">
                내 관심 아파트
              </Text>
              <Text pl="16px" fontSize="14px" color="#AAAAAA">
                등록 수 {propertyCards.length}
              </Text>
            </Box>
          </Box>
          <Box p={4}>
            <Grid templateColumns="repeat(3, 1fr)" gap={8}>
              {propertyCards.slice(0, 3).map((property, index) => (
                <PropertyCard
                  key={index}
                  imageUrl={property.imageUrl}
                  title={property.title}
                  price={property.price}
                  details={property.details}
                  location={property.location}
                />
              ))}
            </Grid>
          </Box>
        </Box>
        <Divider my={4} borderColor="gray.300" width="90%" mx="auto" />
        <Box display="flex" justifyContent="space-between" width="100%" alignItems="center" p={4}>
          <Box display="flex" alignItems="center">
            <Text fontSize="16px" fontWeight="bold">
              내 관심 매물
            </Text>
            <Text pl="16px" fontSize="14px" color="#AAAAAA">
              등록 수 {dealCards.length}
            </Text>
          </Box>
        </Box>
        <Box p={4} display="flex" justifyContent="center">
          <Grid templateColumns="repeat(2, 1fr)" gap={8}>
            {dealCards.slice(0, 2).map((property, index) => (
              <DealCard
                key={index}
                imageUrl={property.imageUrl}
                title={property.title}
                price={property.price}
                dong={property.dong}
                floor={property.floor}
                location={property.location}
              />
            ))}
          </Grid>
        </Box>
      </Box>
    </Box>
  );
}
