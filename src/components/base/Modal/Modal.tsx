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
  extendVariants,
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

const ExtendedModal = extendVariants(NextUIModal, {
  defaultVariants: {
    backdrop: "blur",
    scrollBehavior: "outside",
  },
});

export const Modal: ModalComponent = (props) => {
  const { title, children, className, ...rest } = props;

  return (
    <ExtendedModal
      {...rest}
      classNames={{
        header: "block",
        body: "block",
        footer: "block",
      }}
    >
      <ModalContent>{children}</ModalContent>
    </ExtendedModal>
  );
};

Modal.Header = ModalHeader;
Modal.Body = ModalBody;
Modal.Footer = ModalFooter;
