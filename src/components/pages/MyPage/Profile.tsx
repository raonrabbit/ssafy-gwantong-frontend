import {
  Avatar,
  Box,
  Input,
  Text,
  VStack,
  useDisclosure,
  chakra,
  Image,
  Button,
} from "@chakra-ui/react";
import React, { useRef, useState } from "react";
import { FaPen, FaCheck } from "react-icons/fa";
import { FaX } from "react-icons/fa6";
import { useAppSelector } from "../../../redux/hooks";

interface EditableFieldProps {
  value: string | undefined;
  onSave: (newValue: string) => void;
  placeholder: string;
  editableWidth: string;
}

const EditableField: React.FC<EditableFieldProps> = ({
  value,
  onSave,
  placeholder,
  editableWidth,
}) => {
  const [isEditing, setIsEditing] = useState(false);
  const [currentValue, setCurrentValue] = useState(value || "");
  const [slideLeft, setSlideLeft] = useState(false);

  const handleEdit = () => {
    setSlideLeft(true);
    setTimeout(() => setIsEditing(true), 300);
  };

  const handleSave = () => {
    setIsEditing(false);
    setSlideLeft(false);
    onSave(currentValue);
  };

  return (
    <Box
      position="relative"
      display="flex"
      justifyContent="center"
      alignItems="center"
      borderBottom="1px solid #CCCCCC"
      borderRadius="0"
      width={editableWidth}
      height="40px"
      onClick={!isEditing ? handleEdit : undefined}
      style={{ cursor: !isEditing ? "pointer" : "default" }}
    >
      <Box
        display="flex"
        position="relative"
        height="100%"
        alignItems="center"
        justifyContent="center"
        style={{
          width: "fit-content",
          color: "black",
          transition: "all 0.3s ease",
          position: "absolute",
          left: slideLeft ? 0 : "50%",
          transform: slideLeft ? "translateX(0)" : "translateX(-50%)",
        }}
      >
        {!isEditing ? (
          currentValue || placeholder
        ) : (
          <Input
            value={currentValue}
            onChange={(e) => setCurrentValue(e.target.value)}
            onBlur={handleSave}
            position="absolute"
            left="0px"
            top="0px"
            height="100%"
            width="380px"
            border="none"
            outline="none"
            pl="0px"
            autoFocus
            focusBorderColor="transparent"
            style={{
              transition: "all 0.3s ease",
            }}
          />
        )}
      </Box>
      <FaPen
        style={{
          position: "absolute",
          right: "10px",
        }}
      />
    </Box>
  );
};

export default function Profile() {
  // Get user Info
  const user = useAppSelector((state) => state.auth.user);

  const [name, setName] = useState(user?.nickname);
  const [email, setEmail] = useState(user?.email);
  const [newPassword, setPassword] = useState("");

  return (
    <Box alignItems={"center"}>
      <VStack spacing="40px">
        <Box display="flex" justifyContent="center">
          <Box>
            {user ? (
              <Avatar
                width={{ sm: "80px", md: "140px" }}
                height={{ sm: "80px", md: "140px" }}
                src={user.avatarUrl || undefined}
                cursor="pointer"
              />
            ) : (
              <Avatar name={"X"} cursor="pointer" />
            )}
          </Box>
        </Box>

        <Box
          bg="white"
          width="700px"
          height="340px"
          boxShadow="0px 4px 24px #0000001E"
          borderRadius="24px"
        >
          <Box
            display="flex"
            justifyContent="space-between"
            width="100%"
            alignItems="center"
            borderBottom="2px solid #DDDDDD"
          >
            <Box display="flex" alignItems="center">
              <Image
                src="/images/user_info.webp"
                width="32px"
                height="32px"
                m="16px"
                mr="12px"
                style={{
                  filter: "drop-shadow(0px 2px 4px rgba(0, 0, 0, 0.2))",
                }}
              />
              <Text fontSize="16px" fontWeight="bold">
                회원 정보
              </Text>
            </Box>
            <Button mr="16px" colorScheme={"customOrange"} borderRadius={"24px"}>
              수정
            </Button>
          </Box>
          <VStack
            display="flex"
            width="100%"
            height="300px"
            p="32px"
            justifyContent="space-between"
          >
            <Box width="100%" display="flex">
              <Box
                display="flex"
                width="25%"
                borderRight="2px solid #CCCCCC"
                height="40px"
                alignItems="center"
              >
                <Text fontSize="18px">닉네임</Text>
              </Box>
              <Box display="flex" width="75%" justifyContent="center">
                {/* 닉네임 변경 */}
                <EditableField
                  value={name}
                  onSave={setName}
                  placeholder="닉네임을 입력해주세요."
                  editableWidth="400px"
                />
              </Box>
            </Box>
            <Box width="100%" display="flex">
              <Box
                display="flex"
                width="25%"
                borderRight="2px solid #CCCCCC"
                height="40px"
                alignItems="center"
              >
                <Text fontSize="18px">이메일</Text>
              </Box>
              <Box display="flex" width="75%" justifyContent="center">
                {/* 이메일 변경 */}
                <EditableField
                  value={email}
                  onSave={setEmail}
                  placeholder="이메일을 입력해주세요."
                  editableWidth="400px"
                />
              </Box>
            </Box>
            <Box width="100%" display="flex">
              <Box
                display="flex"
                width="25%"
                borderRight="2px solid #CCCCCC"
                height="40px"
                alignItems="center"
              >
                <Text fontSize="18px">비밀번호</Text>
              </Box>
              <Box display="flex" width="75%" justifyContent="center">
                {/* 비밀번호 변경 */}
                <EditableField
                  value={newPassword}
                  onSave={setPassword}
                  placeholder="****"
                  editableWidth="400px"
                />
              </Box>
            </Box>
            <Box>{/* 비밀번호 확인 코드 여기 작성*/}</Box>
          </VStack>
        </Box>
      </VStack>
    </Box>
  );
}
