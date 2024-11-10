import { Button, Grid, Heading, HStack, Image, Stack, Text, VStack } from "@chakra-ui/react";
import PropertyCard from "./PropertyCard";

type PropertyCardProps = {
  imageUrl: string;
  title: string;
  price: string;
  details: string;
  location: string;
};

export default function PropertyList() {
  const properties: PropertyCardProps[] = [
    {
      imageUrl: "/images/property1.png",
      title: "청담 자이",
      price: "평균 21억 7,600",
      details: "2014년 준공",
      location: "# 서울 # 강남구 # 아파트",
    },
    {
      imageUrl: "/images/property2.png",
      title: "타워팰리스",
      price: "평균 21억 7,600",
      details: "2014년 준공",
      location: "# 서울 # 강남구 # 아파트",
    },
    {
      imageUrl: "/images/property1.png",
      title: "청담 자이",
      price: "평균 21억 7,600",
      details: "2014년 준공",
      location: "# 서울 # 강남구 # 아파트",
    },
    {
      imageUrl: "/images/property2.png",
      title: "타워팰리스",
      price: "평균 21억 7,600",
      details: "2014년 준공",
      location: "# 서울 # 강남구 # 아파트",
    },
    {
      imageUrl: "/images/property1.png",
      title: "청담 자이",
      price: "평균 21억 7,600",
      details: "2014년 준공",
      location: "# 서울 # 강남구 # 아파트",
    },
    {
      imageUrl: "/images/property2.png",
      title: "타워팰리스",
      price: "평균 21억 7,600",
      details: "2014년 준공",
      location: "# 서울 # 강남구 # 아파트",
    },
    {
      imageUrl: "/images/property1.png",
      title: "청담 자이",
      price: "평균 21억 7,600",
      details: "2014년 준공",
      location: "# 서울 # 강남구 # 아파트",
    },
    {
      imageUrl: "/images/property2.png",
      title: "타워팰리스",
      price: "평균 21억 7,600",
      details: "2014년 준공",
      location: "# 서울 # 강남구 # 아파트",
    },
  ];

  return (
    <VStack spacing={8} align="stretch" maxW={"1712px"} marginX={"auto"} marginTop={48}>
      <VStack align="flex-start" spacing={2}>
        <HStack>
          <Image src={"images/fire.svg"}></Image>
          <Heading as="h1" size="xl" fontWeight="bold">
            핫한 매물
          </Heading>
        </HStack>
        <Text color="gray.500">* 평균 매매가는 가장 최근 거래된 물가의 3개월 전까지입니다.</Text>
      </VStack>

      <Grid
        templateColumns={{
          sm: "1fr",
          md: "1fr 1fr",
          lg: "repeat(3, 1fr)",
          xl: "repeat(4, 1fr)",
          //   "2xl": "repeat(5, 1fr)",
        }}
        gap={4}
      >
        {properties.map((property, index) => (
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

      <Button variant="solid" colorScheme="blackAlpha" size="lg" mx="auto">
        더보기
      </Button>
    </VStack>
  );
}
