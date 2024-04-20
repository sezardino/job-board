import {
  ModalBody,
  ModalBodyProps,
  ModalContent,
  ModalFooter,
  ModalFooterProps,
  ModalHeader,
  ModalHeaderProps,
  Modal as NextUIModal,
  Skeleton,
  VariantProps,
  extendVariants,
} from "@nextui-org/react";
import { useRef, type FC } from "react";

import { twMerge } from "tailwind-merge";
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
  Loader: FC<LoaderProps>;
};

type LoaderSizes =
  | "200"
  | "300"
  | "400"
  | "500"
  | "600"
  | "700"
  | "800"
  | "900"
  | "1000";
type LoaderProps = {
  size: LoaderSizes;
};

const loaderSizes: Record<LoaderSizes, string> = {
  "200": "h-[200px]",
  "300": "h-[300px]",
  "400": "h-[400px]",
  "500": "h-[500px]",
  "600": "h-[600px]",
  "700": "h-[700px]",
  "800": "h-[800px]",
  "900": "h-[900px]",
  "1000": "h-[1000px]",
};

const Loader: FC<LoaderProps> = ({ size = "200" }) => {
  return (
    <Skeleton className={twMerge("w-full rounded-lg", loaderSizes[size])} />
  );
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
      // classNames={{
      //   header: "block",
      //   body: "block",
      //   footer: "block",
      // }}
    >
      <ModalContent>{children}</ModalContent>
    </ExtendedModal>
  );
};

Modal.Header = ModalHeader;
Modal.Body = ModalBody;
Modal.Footer = ModalFooter;
Modal.Loader = Loader;
