import { Modal, ModalProps } from "@/components/base/Modal/Modal";
import { Typography } from "@/components/base/Typography/Typography";
import {
  CommentsForm,
  CommentsFormValues,
} from "@/components/forms/Comments/CommentsForm";
import { Button } from "@nextui-org/react";
import { useTranslations } from "next-intl";
import { FC, useId } from "react";

type Props = {
  onFormSubmit: (values: CommentsFormValues) => void;
};

export type NoteFormModalProps = ModalProps & Props;

export const NoteFormModal: FC<NoteFormModalProps> = (props) => {
  const { onFormSubmit, onClose, ...rest } = props;
  const formId = useId();

  const t = useTranslations("page.company.offer-applications");

  return (
    <Modal {...rest} size="lg" onClose={onClose} placement="center">
      <Modal.Header>
        <Typography tag="h2" styling="md">
          {t("modals.note.title")}
        </Typography>
        <Typography tag="p">{t("modals.note.description")}</Typography>
      </Modal.Header>
      <Modal.Body>
        <CommentsForm id={formId} onFormSubmit={onFormSubmit} />
      </Modal.Body>
      <Modal.Footer className="flex justify-between items-center">
        <Button form={formId} type="reset" variant="bordered" onClick={onClose}>
          {t("modals.note.cancel")}
        </Button>
        <Button form={formId} type="submit" color="primary">
          {t("modals.note.confirm")}
        </Button>
      </Modal.Footer>
    </Modal>
  );
};
