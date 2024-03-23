import {
  ModalBody,
  ModalBodyProps,
  ModalContent,
  ModalFooter,
  ModalFooterProps,
  ModalHeader,
  ModalHeaderProps,
  Modal as NextUIModal,
  ModalProps as NextUIModalProps,
} from "@nextui-org/react";
import { type FC } from "react";

export type ModalProps = Omit<NextUIModalProps, "backdrop"> & {
  onClose: () => void;
};

export type ModalComponent = FC<ModalProps> & {
  Header: FC<ModalHeaderProps>;
  Body: FC<ModalBodyProps>;
  Footer: FC<ModalFooterProps>;
};

export const Modal: ModalComponent = (props) => {
  const { title, isOpen, onClose, children, className, ...rest } = props;

  return (
    <NextUIModal
      {...rest}
      isOpen={isOpen}
      onClose={onClose}
      backdrop="blur"
      scrollBehavior="outside"
    >
      <ModalContent>{children}</ModalContent>
    </NextUIModal>
  );
};

Modal.Header = ModalHeader;
Modal.Body = ModalBody;
Modal.Footer = ModalFooter;
