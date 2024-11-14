import {
  Box,
  Table,
  TableCaption,
  TableContainer,
  Tbody,
  Td,
  Text,
  Tfoot,
  Th,
  Thead,
  Tr,
  VStack,
} from "@chakra-ui/react";
import React from "react";

const TradeList: React.FC = () => {
  return (
    <TableContainer>
      <Table variant="simple" size={"sm"}>
        <TableCaption>Imperial to metric conversion factors</TableCaption>
        <Thead>
          <Tr>
            <Th>계약일</Th>
            <Th>타입</Th>
            <Th isNumeric>금액</Th>
          </Tr>
        </Thead>
        <Tbody>
          <Tr>
            <Td>24.11.02</Td>
            <Td>71C</Td>
            <Td colSpan={2}>
              <VStack display="flex" align={"end"}>
                <Text>21억 1200</Text>
                <Text>13층</Text>
              </VStack>
            </Td>
          </Tr>
          <Tr>
            <Td>24.11.02</Td>
            <Td>71C</Td>
            <Td colSpan={2}>
              <VStack display="flex" align={"end"}>
                <Text>21억 1200</Text>
                <Text>13층</Text>
              </VStack>
            </Td>
          </Tr>
          <Tr>
            <Td>24.11.02</Td>
            <Td>71C</Td>
            <Td colSpan={2}>
              <VStack display="flex" align={"end"}>
                <Text>21억 1200</Text>
                <Text>13층</Text>
              </VStack>
            </Td>
          </Tr>
          <Tr>
            <Td>24.11.02</Td>
            <Td>71C</Td>
            <Td colSpan={2}>
              <VStack display="flex" align={"end"}>
                <Text>21억 1200</Text>
                <Text>13층</Text>
              </VStack>
            </Td>
          </Tr>
        </Tbody>
      </Table>
    </TableContainer>
  );
};

export default TradeList;
