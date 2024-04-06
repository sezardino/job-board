import {
  ModalBody,
  ModalBodyProps,
  ModalContent,
  ModalFooter,
  ModalFooterProps,
  ModalHeader,
  ModalHeaderProps,
  Modal as NextUIModal,
  VariantProps,
  extendVariants,
} from "@nextui-org/react";
import { type FC } from "react";

const ExtendedModal = extendVariants(NextUIModal, {
  variants: {
    isDrawer: {
      true: {
        base: [
          "mt-0 mb-0 ml-0 mr-0 sm:mt-0 sm:mb-0 sm:ml-0 sm:mr-0 rounded-none ",
          "fixed",
          "top-0 bottom-0 right-0",
        ],
      },
    },
  },
});

type Props = {
  onClose: () => void;
  className?: string;
};

type ExtendedModalProps = VariantProps<typeof ExtendedModal>;
export type ModalProps = Omit<ExtendedModalProps, "backdrop"> & Props;

export type ModalComponent = FC<ModalProps> & {
  Header: FC<ModalHeaderProps>;
  Body: FC<ModalBodyProps>;
  Footer: FC<ModalFooterProps>;
};

export const Modal: ModalComponent = (props) => {
  const { title, children, className, ...rest } = props;

  return (
    <ExtendedModal
      {...rest}
      backdrop="blur"
      scrollBehavior="outside"
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
