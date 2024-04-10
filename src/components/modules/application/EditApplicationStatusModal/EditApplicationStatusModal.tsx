import { Modal, ModalProps } from "@/components/base/Modal/Modal";
import { Typography } from "@/components/base/Typography/Typography";
import {
  ApplicationStatusForm,
  ApplicationStatusFormValues,
} from "@/components/forms/ApplicationStatus/ApplicationStatusForm";
import { Button } from "@nextui-org/react";
import { ApplicationStatus } from "@prisma/client";
import { useTranslations } from "next-intl";
import { FC, useId } from "react";

type Props = {
  activeStatus: ApplicationStatus;
  onChangeApplicationStatus: (values: ApplicationStatusFormValues) => void;
};

export type EditApplicationStatusModalProps = ModalProps & Props;

export const EditApplicationStatusModal: FC<EditApplicationStatusModalProps> = (
  props
) => {
  const { activeStatus, onChangeApplicationStatus, onClose, ...rest } = props;
  const formId = useId();

  const t = useTranslations("page.company.offer-applications");

  return (
    <Modal {...rest} onClose={onClose} placement="center">
      <Modal.Header>
        <Typography tag="h2" styling="md">
          {t("modals.change-status.title")}
        </Typography>
        <Typography tag="p">{t("modals.change-status.description")}</Typography>
      </Modal.Header>
      <Modal.Body>
        <ApplicationStatusForm
          id={formId}
          initialStatus={activeStatus!}
          onFormSubmit={onChangeApplicationStatus}
        />
      </Modal.Body>
      <Modal.Footer className="flex justify-between items-center">
        <Button form={formId} type="reset" variant="bordered" onClick={onClose}>
          {t("modals.change-status.cancel")}
        </Button>
        <Button form={formId} type="submit" color="primary">
          {t("modals.change-status.confirm")}
        </Button>
      </Modal.Footer>
    </Modal>
  );
};
