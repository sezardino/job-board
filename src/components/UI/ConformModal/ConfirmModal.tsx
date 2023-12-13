import { Button, LoadingOverlay, Modal, ModalProps } from "@/components/base";
import { type FC } from "react";

export interface ConfirmModalProps extends Omit<ModalProps, "children"> {
  cancelText: string;
  confirmText: string;
  onCancelClick: () => void;
  onConfirmClick: () => Promise<any>;
  isLoading?: boolean;
}

export const ConfirmModal: FC<ConfirmModalProps> = (props) => {
  const {
    isLoading,
    cancelText,
    confirmText,
    onCancelClick,
    onClose,
    onConfirmClick,
    className,
    ...rest
  } = props;

  const confirmHandler = async () => {
    try {
      await onConfirmClick();
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
        onClick={onCancelClick}
      >
        {cancelText}
      </Button>
      <Button color="primary" size="md" onClick={confirmHandler}>
        {confirmText}
      </Button>
    </Modal>
  );
};
