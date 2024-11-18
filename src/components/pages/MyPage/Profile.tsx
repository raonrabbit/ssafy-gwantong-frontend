import { Avatar, Box, Input, Text, VStack, useDisclosure, chakra, Image } from "@chakra-ui/react";
import React, { useRef, useState } from "react";
import { FaPen } from "react-icons/fa";
import { useAppSelector } from "../../../redux/hooks";
import { motion } from "framer-motion";

const MotionBox = chakra(motion.div);

export default function Profile() {
  // Get user Info
  const user = useAppSelector((state) => state.auth.user);

  // Profile Image
  const [profileImage, setImage] = useState(null);
  const fileInput = useRef(null);

  // Modal
  const { isOpen, onOpen, onClose } = useDisclosure();
  const initialRef = React.useRef(null);
  const finalRef = React.useRef(null);

  // Nickname Change
  const [isEditing, setIsEditing] = useState(false);
  const [name, setName] = useState(user?.nickname);
  const [slideLeft, setSlideLeft] = useState(false); // 슬라이드 애니메이션 상태

  const handleEdit = () => {
    setSlideLeft(true); // 왼쪽으로 슬라이드 시작
    setTimeout(() => setIsEditing(true), 300); // 애니메이션 완료 후 Input으로 전환
  };

  const handleSave = () => {
    setIsEditing(false);
    setSlideLeft(false); // 오른쪽으로 슬라이드 시작
    //setTimeout(() => setIsEditing(false), 300); // 애니메이션 완료 후 보기 모드로 전환
  };

  // Email change
  const [isEditingEmail, setIsEditingEmail] = useState(false);
  const [email, setEmail] = useState(user?.email);
  const [slideLeftEmail, setSlideLeftEmail] = useState(false);

  const handleEditEmail = () => {
    setSlideLeftEmail(true);
    setTimeout(() => setIsEditingEmail(true), 300);
  };

  const handleSaveEmail = () => {
    setIsEditingEmail(false);
    setSlideLeftEmail(false);
  };

  return (
    <Box alignItems={"center"}>
      <VStack spacing={15}>
        <VStack display="flex" justifyContent="center">
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
          <Box
            position="relative"
            display="flex"
            justifyContent="center"
            alignItems="center"
            borderBottom="1px solid #CCCCCC"
            borderRadius="0"
            width="245px"
            height="40px"
            onClick={!isEditing ? handleEdit : undefined} // 클릭 시 편집 시작
            style={{ cursor: !isEditing ? "pointer" : "default" }}
          >
            {/* 이름 또는 입력창 */}
            <Box
              display="flex"
              position="relative" // 부모 기준 위치 설정
              height="100%"
              alignItems="center"
              justifyContent="center"
              style={{
                width: "fit-content", // 콘텐츠 크기에 따라 너비 설정
                color: "black",
                transition: "all 0.3s ease", // 애니메이션 효과
                position: "absolute", // 부모 기준으로 위치 조정
                left: slideLeft ? 0 : "50%", // 부모의 왼쪽 끝 또는 중앙으로 이동
                transform: slideLeft ? "translateX(0)" : "translateX(-50%)", // 중앙 정렬 보정
              }}
            >
              {!isEditing ? (
                name || user ? (
                  user?.nickname
                ) : (
                  "이름을 입력해주세요."
                )
              ) : (
                <Input
                  value={name}
                  onChange={(e) => setName(e.target.value)} // 이름 업데이트
                  onBlur={handleSave} // 포커스를 잃으면 저장
                  position="absolute"
                  left="0px"
                  top="0px"
                  height="100%"
                  width="180px"
                  border="none"
                  outline="none"
                  pl="0px"
                  autoFocus // 입력창 자동 포커스
                  focusBorderColor="transparent"
                  style={{
                    transition: "all 0.3s ease",
                  }}
                />
              )}
            </Box>

            {/* 펜 아이콘 */}
            <FaPen
              style={{
                position: "absolute",
                transform: "translateY(-50%)",
                top: "50%",
                right: "10px",
              }}
            />
          </Box>
        </VStack>

        <Box width="700px" height="380px" boxShadow="0px 4px 24px #0000001E" borderRadius="24px">
          <Box display="flex" width="100%" alignItems="center" borderBottom="2px solid #DDDDDD">
            <Image
              src="/images/user_info.webp"
              width="32px"
              height="32px"
              m="16px"
              mr="12px"
            ></Image>
            <Text fontSize="16px" fontWeight="bold">
              회원 정보
            </Text>
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
                <Text fontSize="20px">이메일</Text>
              </Box>
              <Box
                position="relative"
                display="flex"
                justifyContent="center"
                alignItems="center"
                borderBottom="1px solid #CCCCCC"
                borderRadius="0"
                width="450px"
                height="40px"
                ml="20px"
                onClick={!isEditingEmail ? handleEditEmail : undefined} // 클릭 시 편집 시작
                style={{ cursor: !isEditingEmail ? "pointer" : "default" }}
              >
                {/* 이름 또는 입력창 */}
                <Box
                  display="flex"
                  position="relative" // 부모 기준 위치 설정
                  height="100%"
                  alignItems="center"
                  justifyContent="center"
                  style={{
                    width: "fit-content", // 콘텐츠 크기에 따라 너비 설정
                    color: "black",
                    transition: "all 0.3s ease", // 애니메이션 효과
                    position: "absolute", // 부모 기준으로 위치 조정
                    left: slideLeftEmail ? 0 : "50%", // 부모의 왼쪽 끝 또는 중앙으로 이동
                    transform: slideLeftEmail ? "translateX(0)" : "translateX(-50%)", // 중앙 정렬 보정
                  }}
                >
                  {!isEditingEmail ? (
                    email || user ? (
                      user?.email
                    ) : (
                      "이메일을 입력해주세요."
                    )
                  ) : (
                    <Input
                      value={email}
                      onChange={(e) => setEmail(e.target.value)} // 이름 업데이트
                      onBlur={handleSaveEmail} // 포커스를 잃으면 저장
                      position="absolute"
                      left="0px"
                      top="0px"
                      height="100%"
                      width="380px"
                      border="none"
                      outline="none"
                      pl="0px"
                      autoFocus // 입력창 자동 포커스
                      focusBorderColor="transparent"
                      style={{
                        transition: "all 0.3s ease",
                      }}
                    />
                  )}
                </Box>

                {/* 펜 아이콘 */}
                <FaPen
                  style={{
                    position: "absolute",
                    transform: "translateY(-50%)",
                    top: "50%",
                    right: "10px",
                  }}
                />
              </Box>
            </Box>
            <Box width="100%">
              <Box
                display="flex"
                width="25%"
                borderRight="2px solid #CCCCCC"
                height="40px"
                alignItems="center"
              >
                <Text fontSize="20px">비밀번호</Text>
              </Box>
            </Box>
            <Box width="100%">
              <Box
                display="flex"
                width="25%"
                borderRight="2px solid #CCCCCC"
                height="40px"
                alignItems="center"
              >
                <Text fontSize="20px">비밀번호 확인</Text>
              </Box>
            </Box>
          </VStack>
        </Box>
      </VStack>
    </Box>
  );
}
