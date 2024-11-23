import { Box, Link, Text } from "@chakra-ui/react";

type NewsTitleCardProps = {
  title: string;
  originallink: string;
};

const NewsTitleCard: React.FC<NewsTitleCardProps> = ({ title, originallink }) => {
  return (
    <Link href={originallink} isExternal _hover={{ textDecoration: "none" }}>
      <Box
        width="620px"
        bg="gray.300"
        borderRadius="24px"
        p={6}
        boxShadow="md"
        _hover={{ bg: "gray.200", transform: "scale(1.02)" }}
        transition="all 0.2s"
      >
        <Text fontSize="20px" fontWeight="medium" noOfLines={1} color="black">
          {title}
        </Text>
      </Box>
    </Link>
  );
};

export default NewsTitleCard;
