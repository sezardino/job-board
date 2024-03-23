import { useTranslations } from "next-intl";
import { FC, useCallback, useState } from "react";
import { ConfirmModal } from "../UI/ConformModal/ConfirmModal";
import {
  EditJobOfferData,
  EditJobOfferModal,
} from "../modules/company/EditJobOfferModal/EditJobOfferModal";

type Props = {
  offerId: string;
  isOpen: boolean;
  onClose: () => void;
};

export type EditJobOfferProps = Props;

export const EditJobOfferWrapper: FC<EditJobOfferProps> = (props) => {
  const { offerId, isOpen, onClose } = props;

  const t = useTranslations("components.edit-job-offer-wrapper");

  const [dataToSave, setDataToSave] = useState<EditJobOfferData | null>(null);
  const [isConfirmModalOpen, setIsConfirmModalOpen] = useState(false);

  const openConfirmModalHandler = useCallback((values: EditJobOfferData) => {
    setDataToSave(values);
    setIsConfirmModalOpen(true);
  }, []);

  const editJobOfferHandler = useCallback(() => {}, []);

  return (
    <>
      <EditJobOfferModal
        isOpen={isOpen}
        onClose={onClose}
        onEditJobOffer={openConfirmModalHandler}
      />

      <ConfirmModal
        title={t("confirm-modal.title")}
        description={t("confirm-modal.description")}
        buttons={[
          {
            text: t("confirm-modal.cancel"),
            onClick: () => setIsConfirmModalOpen(false),
          },
          {
            text: t("confirm-modal.confirm"),
            onClick: editJobOfferHandler,
          },
        ]}
        isOpen={isConfirmModalOpen}
        onClose={() => setIsConfirmModalOpen(false)}
      />
    </>
  );
};
