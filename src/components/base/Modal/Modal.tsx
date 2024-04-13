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
import { useRef, type FC } from "react";

import styles from "./Modal.module.scss";

const ExtendedModal = extendVariants(NextUIModal, {
  variants: { isDrawer: { true: { base: styles.drawer } } },
});

type Props = {
  onClose: () => void;
  onAfterClose?: () => void;
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
  const { title, children, className, onAfterClose, ...rest } = props;
  const timerRef = useRef<number | null>(null);

  const openChangeHandler = (open: boolean) => {
    if (!open && onAfterClose) {
      timerRef.current = window.setTimeout(() => {
        onAfterClose();
      }, 500);
    } else if (open && timerRef.current) {
      clearTimeout(timerRef.current);
    }
  };

  return (
    <ExtendedModal
      {...rest}
      backdrop="blur"
      scrollBehavior="outside"
      onOpenChange={openChangeHandler}
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
