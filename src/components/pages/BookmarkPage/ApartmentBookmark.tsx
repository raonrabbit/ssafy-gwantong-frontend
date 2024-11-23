import { Box, Divider, Grid, Text } from "@chakra-ui/react";
import { PropertyCardProps } from "../Cards/PropertyCardProps";
import PropertyCard from "../Cards/PropertyCard";

export default function ApartmentBookmark() {
  const properties: PropertyCardProps[] = [
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

  return (
    <Box
      bg="white"
      borderRadius="24px"
      boxShadow="0px 4px 24px #0000001E"
      p="40px"
      m="24px"
      width="1000px"
    >
      <Box>
        <Text fontSize="32px">아파트</Text>
        <Divider my={2} borderColor="gray.300" mb="24px" />
      </Box>
      <Grid
        templateColumns="repeat(4, 1fr)"
        gap={8} // 행과 열 간격
      >
        {properties.map((property, index) => (
          <Box display="flex" justifyContent="center">
            <PropertyCard
              key={index}
              imageUrl={property.imageUrl}
              title={property.title}
              price={property.price}
              details={property.details}
              location={property.location}
            />
          </Box>
        ))}
      </Grid>
    </Box>
  );
}
