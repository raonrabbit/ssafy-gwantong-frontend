import {
  Button,
  Grid,
  Heading,
  HStack,
  Image,
  Stack,
  Text,
  VStack,
  useColorModeValue,
} from "@chakra-ui/react";
import PropertyCard from "./PropertyCard";
import { Link, useNavigate } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import { getHotApts } from "../../../api/apt";

interface HotAptData {
  aptId: string;
  aptName: string;
  buildYear: number;
  recentMonth: string;
  recentPrice: number;
  previousMonth: string;
  previousPrice: number;
  jibun: string;
  roadName: string;
  sidoName: string;
  gugunName: string;
  dongName: string;
}

export default function PropertyList() {
  const buttonColor = useColorModeValue("blackAlpha.900", "gray.600");
  const hoverColor = useColorModeValue("blackAlpha.700", "gray.400");
  const navigate = useNavigate();

  const { data } = useQuery<HotAptData[]>({
    queryKey: ["hotApts"],
    queryFn: getHotApts,
  });

  return (
    <VStack spacing={8} align="stretch" maxW={"1712px"} marginX={"auto"} marginTop={48}>
      <VStack align="flex-start" spacing={2}>
        <HStack gap={0}>
          <Image src={"images/Fire.webp"} h={"78px"} animation={"bounce 4s infinite"}></Image>
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
        {data?.slice(0, 8).map((hotApt: any) => (
          <Link key={hotApt.aptId} to={`/map/apt/${hotApt.aptId}`}>
            <PropertyCard
              {...hotApt}
              percentChange={
                ((hotApt.recentPrice - hotApt.previousPrice) / hotApt.previousPrice) * 100
              }
            />
          </Link>
        ))}
      </Grid>

      <Button
        borderRadius={24}
        backgroundColor={buttonColor}
        size="lg"
        mx="auto"
        color={"white"}
        w={"200px"}
        _hover={{
          backgroundColor: hoverColor,
        }}
        onClick={() => navigate("/map")}
      >
        더보기
      </Button>
    </VStack>
  );
}
