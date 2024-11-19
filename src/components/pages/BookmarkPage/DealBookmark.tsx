import { Box, Button, Divider, Grid, Text } from "@chakra-ui/react";
import { DealCardProps } from "../../../types/DealCardProps";
import DealCard from "../MyPage/DealCard";
import { useState } from "react";

export default function DealBookmark() {
  const initialProperties: DealCardProps[] = [
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

  const [sortCriteria, setSortCriteria] = useState("최신순");
  const [properties, setProperties] = useState<DealCardProps[]>(initialProperties);

  const sortProperties = (criteria: string) => {
    let sortedProperties: DealCardProps[] = [];
    if (criteria === "최신순") {
      sortedProperties = [...initialProperties];
    } else if (criteria === "고가순") {
      sortedProperties = [...properties].sort((a, b) => parseInt(b.price) - parseInt(a.price));
    } else if (criteria === "저가순") {
      sortedProperties = [...properties].sort((a, b) => parseInt(a.price) - parseInt(b.price));
    }

    setSortCriteria(criteria);
    setProperties(sortedProperties);
  };

  return (
    <Box
      bg="white"
      borderRadius="24px"
      boxShadow="0px 4px 24px #0000001E"
      p="40px"
      m="24px"
      width="1000px"
    >
      <Box display="flex" justifyContent="space-between" alignItems="center">
        <Text fontSize="32px">매물</Text>
        <Grid templateColumns="repeat(3, 1fr)" gap={4}>
          {["최신순", "고가순", "저가순"].map((criteria) => (
            <Button
              key={criteria}
              variant={sortCriteria === criteria ? "solid" : "ghost"}
              colorScheme={sortCriteria === criteria ? "customOrange" : "gray"}
              onClick={() => sortProperties(criteria)}
              borderRadius="24px"
            >
              {criteria}
            </Button>
          ))}
        </Grid>
      </Box>
      <Divider my={2} borderColor="gray.300" mb="24px" />
      <Grid
        templateColumns="repeat(3, 1fr)"
        gap={8} // 행과 열 간격
      >
        {properties.map((property, index) => (
          <Box display="flex" justifyContent="center">
            <DealCard
              key={index}
              imageUrl={property.imageUrl}
              title={property.title}
              price={property.price}
              dong={property.dong}
              floor={property.floor}
              location={property.location}
            />
          </Box>
        ))}
      </Grid>
    </Box>
  );
}
