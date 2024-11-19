import { Box, Button, Grid, Image, Text } from "@chakra-ui/react";
import DealCard from "./DealCard";
import { DealCardProps } from "../../../types/DealCardProps";

export default function DealBookmark() {
  const properties: DealCardProps[] = [
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
    {
      imageUrl: "/images/property1.png",
      title: "청담 자이",
      price: "21,000",
      dong: "102",
      floor: "20",
      location: "서울 강남구 뭐시기동",
    },
    {
      imageUrl: "/images/property2.png",
      title: "농담곰하우스",
      price: "28,000",
      dong: "202",
      floor: "8",
      location: "경기도 화성시 자시기동",
    },
  ];
  return (
    <Box style={{ alignItems: "center" }}>
      <Box
        bg="white"
        width="700px"
        height="auto"
        boxShadow="0px 4px 24px #0000001E"
        borderRadius="24px"
      >
        {/* Header Section */}
        <Box
          display="flex"
          justifyContent="space-between"
          width="100%"
          alignItems="center"
          borderBottom="2px solid #DDDDDD"
        >
          <Box display="flex" alignItems="center">
            <Image
              src="/images/heart.webp"
              width="32px"
              height="32px"
              m="16px"
              mr="12px"
              style={{
                filter: "drop-shadow(0px 2px 4px rgba(0, 0, 0, 0.2))",
              }}
            />
            <Text fontSize="16px" fontWeight="bold">
              내 관심 매물
            </Text>
            <Text pl="16px" fontSize="14px" color="#AAAAAA">
              등록 수 {properties.length}
            </Text>
          </Box>
          <Box pr="16px">
            <Button fontSize="14px" colorScheme={"customOrange"} borderRadius={"24px"}>
              더보기 {properties.length}
            </Button>
          </Box>
        </Box>

        {/* Grid Section */}
        <Box p={4}>
          <Grid
            templateColumns={{
              base: "repeat(3, 1fr)",
            }}
            gap={8}
          >
            {properties.slice(0, 3).map((property, index) => (
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
