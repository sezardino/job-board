import { Button, Modal, ModalProps } from "@/components/base";
import { type FC } from "react";

type ModalButton = {
  text: string;
  onClick: () => void;
};

export interface ConfirmModalProps extends Omit<ModalProps, "children"> {
  cancel: ModalButton;
  confirm: ModalButton;
}

export const ConfirmModal: FC<ConfirmModalProps> = (props) => {
  const { cancel, confirm, className, ...rest } = props;

  return (
    <Modal
      {...rest}
      className="border-t flex flex-row gap-3 flex-wrap justify-between"
    >
      <Button
        variant="bordered"
        color="primary"
        size="md"
        onClick={cancel.onClick}
      >
        {cancel.text}
      </Button>
      <Button color="primary" size="md" onClick={confirm.onClick}>
        {confirm.text}
      </Button>
    </Modal>
  );
};
