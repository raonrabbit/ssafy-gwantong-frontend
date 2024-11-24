import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalFooter,
  ModalCloseButton,
  Button,
} from "@chakra-ui/react";

interface NoticeDeleteModalProps {
  isOpen: boolean;
  onClose: () => void;
  onConfirm: () => void;
  isLoading?: boolean;
}

export default function NoticeDeleteModal({
  isOpen,
  onClose,
  onConfirm,
  isLoading,
}: NoticeDeleteModalProps) {
  return (
    <Modal isOpen={isOpen} onClose={onClose} isCentered>
      <ModalOverlay />
      <ModalContent>
        <ModalHeader>공지사항 삭제</ModalHeader>
        <ModalCloseButton />
        <ModalBody>정말로 삭제하시겠습니까? 삭제하시면 복구가 불가능합니다.</ModalBody>
        <ModalFooter>
          <Button colorScheme="red" onClick={onConfirm} isLoading={isLoading}>
            예
          </Button>
          <Button colorScheme="blackAlpha" ml={3} onClick={onClose}>
            아니오
          </Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
}
