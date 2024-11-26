import { Table, TableContainer, Tbody, Td, Text, Th, Thead, Tr, VStack } from "@chakra-ui/react";
import React from "react";

// 단일 거래 정보 인터페이스
interface TradeDetail {
  date: string;
  size: number;
  price: number;
  floor: string;
}

// TradeList 컴포넌트 Props 타입 정의
interface TradeListProps {
  tradeDetails: TradeDetail[];
}

const TradeList: React.FC<TradeListProps> = ({ tradeDetails }) => {
  const formatDate = (date: string): string => {
    const [year, month, day] = date.split("-");
    return `${year.slice(2)}.${month}.${day}`;
  };

  const formatPriceToKorean = (price: number): string => {
    const billion = Math.floor(price / 10000);
    const thousand = Math.round(price % 10000);
    if (billion === 0) return `${thousand}만`;
    if (thousand === 0) return `${billion}억`;
    return `${billion}억 ${thousand}`;
  };

  return (
    <TableContainer>
      <Table variant="simple" w={"358px"} size={"sm"}>
        <Thead>
          <Tr>
            <Th>계약일</Th>
            <Th>타입</Th>
            <Th isNumeric>금액</Th>
          </Tr>
        </Thead>
        <Tbody>
          {tradeDetails.map((trade, index) => (
            <Tr key={index}>
              <Td>{formatDate(trade.date) || "날짜 없음"}</Td>
              <Td>{`${trade.size}평`}</Td>
              <Td colSpan={2}>
                <VStack display="flex" align={"end"}>
                  <Text fontWeight={"bold"}>{formatPriceToKorean(trade.price)}</Text>
                  <Text>{`${trade.floor}층`}</Text>
                </VStack>
              </Td>
            </Tr>
          ))}
        </Tbody>
      </Table>
    </TableContainer>
  );
};

export default TradeList;
