import { Button, LoadingOverlay, Modal, ModalProps } from "@/components/base";
import NextLink from "next/link";
import { type FC } from "react";

export interface ConfirmModalProps extends Omit<ModalProps, "children"> {
  cancel: {
    text: string;
    onClick: () => void;
  };
  confirm: {
    text: string;
    onClick?: () => Promise<any> | void;
    href?: string;
  };
  isLoading?: boolean;
}

export const ConfirmModal: FC<ConfirmModalProps> = (props) => {
  const { isLoading, onClose, cancel, confirm, className, ...rest } = props;

  const confirmHandler = async () => {
    try {
      await confirm.onClick?.();
      onClose();
    } catch (error) {}
  };

  return (
    <Modal
      {...rest}
      onClose={onClose}
      className="border-t flex flex-row gap-3 flex-wrap justify-between"
    >
      {isLoading && <LoadingOverlay isInWrapper />}

      <Button
        variant="bordered"
        color="primary"
        size="md"
        onClick={cancel.onClick}
      >
        {cancel.text}
      </Button>
      <Button
        as={confirm.href ? NextLink : undefined}
        href={confirm.href}
        color="primary"
        size="md"
        onClick={confirmHandler}
      >
        {confirm.text}
      </Button>
    </Modal>
  );
};
