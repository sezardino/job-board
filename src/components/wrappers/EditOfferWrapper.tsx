import { useEditOfferMutation } from "@/hooks/react-query/mutation/offers/edit";
import { useOfferEditionDataQuery } from "@/hooks/react-query/query/offers/data-for-edition";
import { useTranslations } from "next-intl";
import { FC, useCallback, useMemo, useState } from "react";
import { ConfirmModal } from "../UI/ConformModal/ConfirmModal";
import { TitleDescription } from "../UI/TitleDescription/TitleDescription";

import { Grid } from "../base/Grid/Grid";
import { LoadingOverlay } from "../base/LoadingOverlay/LoadingOverlay";
import { Modal } from "../base/Modal/Modal";
import { Stepper } from "../base/Stepper/Stepper";
import {
  OfferFormDescriptionStep,
  OfferFormDescriptionStepFormValues,
} from "../forms/OfferConfigurationSteps/Description";
import {
  OfferFormSkillsStep,
  OfferFormSkillsStepFormValues,
} from "../forms/OfferConfigurationSteps/Skills";

const editOfferFormSteps = {
  skills: "skills",
  description: "description",
} as const;

type OfferFormStep =
  (typeof editOfferFormSteps)[keyof typeof editOfferFormSteps];

const stepsArray: OfferFormStep[] = Object.values(editOfferFormSteps);

export type EditOfferData = {
  skills?: OfferFormSkillsStepFormValues;
  description?: OfferFormDescriptionStepFormValues;
};

type SaveStepData =
  | { step: "skills"; data: OfferFormSkillsStepFormValues }
  | { step: "description"; data: OfferFormDescriptionStepFormValues };

type Props = {
  offerId?: string;
  onClose: () => void;
};

type WrapperModals = "confirm" | "cancel" | "back" | "no-changes";

export type EditOfferWrapperProps = Props;

export const EditOfferWrapper: FC<EditOfferWrapperProps> = (props) => {
  const { offerId, onClose } = props;
  const t = useTranslations("components.company.edit-job-offer-wrapper");

  const { data: editionData, isFetching: isEditionDataLoading } =
    useOfferEditionDataQuery(offerId);
  const { mutateAsync: editOffer, isPending: isEditOfferLoading } =
    useEditOfferMutation();

  const [step, setStep] = useState<OfferFormStep>("skills");
  const [values, setValues] = useState<EditOfferData>({});
  const [prevStep, setPrevStep] = useState<OfferFormStep | null>(null);
  const [openedModal, setOpenedModal] = useState<WrapperModals | null>(null);

  const initialValues = useMemo(
    () => ({
      skills: values.skills
        ? values.skills
        : { skills: editionData?.skills || [] },
      description: values.description
        ? values.description
        : { description: editionData?.description || "" },
    }),
    [editionData, values]
  );

  const changedStatus = useMemo(() => {
    const { description, skills } = values;
    const initialStatus = { skills: false, description: false };

    if (!editionData) return initialStatus;

    const isSkillsChanged =
      JSON.stringify(skills) !== JSON.stringify({ skills: editionData.skills });

    const isDescriptionChanged =
      description?.description !== editionData.description.trim();

    console.log("isSkillsChanged", isSkillsChanged);
    console.log("isDescriptionChanged", isDescriptionChanged);

    return { skills: isSkillsChanged, description: isDescriptionChanged };
  }, [editionData, values]);

  const confirmHandler = useCallback(() => {
    if (!editionData) return false;

    if (!values.skills && !values.description) {
      setOpenedModal("no-changes");
      return;
    }

    if (!changedStatus.skills && !changedStatus.description) {
      setOpenedModal("no-changes");
      return;
    }

    setOpenedModal("confirm");
  }, [changedStatus.description, changedStatus.skills, editionData, values]);

  const saveStepData = (value: SaveStepData) => {
    const { step, data } = value;

    switch (step) {
      case "skills": {
        const isSkillsChanged = changedStatus.skills;

        if (isSkillsChanged) setValues((prev) => ({ ...prev, skills: data }));
        if (!isSkillsChanged)
          setValues((prev) => ({ ...prev, skills: undefined }));
        setStep("description");
        break;
      }
      case "description": {
        const isDescriptionChanged = changedStatus.description;

        if (isDescriptionChanged)
          setValues((prev) => ({ ...prev, description: data }));

        if (changedStatus.skills || changedStatus.description)
          return confirmHandler();
        closeHandler();
        break;
      }
    }
  };

  const toPrevStep = (step?: OfferFormStep) => {
    if (step) {
      setStep(step);
      return;
    }

    if (prevStep) {
      setStep(prevStep);
      setPrevStep(null);
    }
  };

  const filledCount = Object.keys(values).length;

  const closeHandler = useCallback(() => {
    setStep("skills");
    onClose();
    setOpenedModal(null);
    setValues({});
  }, [onClose]);

  const skillsBackButtonHandler = (dirty: boolean) => {
    // not dirty and no data was changed
    if (!dirty && !values.description) {
      closeHandler();
      return;
    }

    if (!values.skills && !values.description) {
      closeHandler();
      return;
    }

    setOpenedModal("cancel");
  };

  const editOfferHandler = useCallback(async () => {
    if (!offerId) return;
    if (!values.skills && !values.description) return;

    try {
      await editOffer({
        id: offerId,
        description: changedStatus.description
          ? values.description?.description
          : undefined,
        skills: changedStatus.skills ? values.skills?.skills : undefined,
      });

      closeHandler();
    } catch (error) {}
  }, [
    changedStatus.description,
    changedStatus.skills,
    closeHandler,
    editOffer,
    offerId,
    values.description,
    values.skills,
  ]);

  return (
    <>
      {isEditionDataLoading && <LoadingOverlay />}

      <Modal
        isOpen={!!offerId}
        size="5xl"
        placement="top"
        onClose={closeHandler}
      >
        <Modal.Header>
          <Grid gap={10}>
            <TitleDescription
              titleLevel="h2"
              title={t("edit.title", { value: editionData?.name || "" })}
              description={t("edit.description")}
              isTextCentered
            />
            <Stepper
              count={stepsArray.length}
              filledCount={filledCount}
              currentCount={stepsArray.findIndex((i) => i === step)}
              className="max-w-80 mx-auto"
            />
          </Grid>
        </Modal.Header>

        <Modal.Body>
          {step === "skills" && (
            <OfferFormSkillsStep
              key={editionData?.id}
              initialValues={initialValues.skills}
              onFormSubmit={(data) => saveStepData({ step: "skills", data })}
              onBackClick={skillsBackButtonHandler}
              backCopy={t("edit.cancel")}
              nextCopy={t("edit.next")}
            />
          )}

          {step === "description" && (
            <OfferFormDescriptionStep
              initialValues={initialValues.description}
              onFormSubmit={(data) =>
                saveStepData({ step: "description", data })
              }
              onBackClick={(dirty) =>
                dirty ? setPrevStep("skills") : setStep("skills")
              }
              backCopy={t("edit.back")}
              nextCopy={t("edit.edit")}
            />
          )}
        </Modal.Body>
      </Modal>

      {/* confirm before save */}
      <ConfirmModal
        title={t("confirm.title")}
        description={t("confirm.description")}
        buttons={[
          {
            text: t("confirm.cancel"),
            variant: "bordered",
            color: "default",
            onClick: () => setOpenedModal(null),
          },
          {
            text: t("confirm.confirm"),
            onClick: editOfferHandler,
          },
        ]}
        isOpen={openedModal === "confirm"}
        onClose={() => setOpenedModal(null)}
      />

      {/* cancel when min one step was changed */}
      <ConfirmModal
        title={t("cancel.title")}
        description={t("cancel.description")}
        buttons={[
          {
            text: t("cancel.cancel"),
            variant: "bordered",
            onClick: () => setOpenedModal(null),
          },
          {
            text: t("cancel.confirm"),
            color: "primary",
            onClick: closeHandler,
          },
        ]}
        isOpen={openedModal === "cancel"}
        onClose={() => setOpenedModal(null)}
      />

      {/* back, when step is dirty */}
      <ConfirmModal
        title={t("back.title")}
        description={t("back.description")}
        buttons={[
          {
            text: t("back.cancel"),
            variant: "bordered",
            onClick: () => setPrevStep(null),
          },
          {
            text: t("back.confirm"),
            color: "primary",
            onClick: () => toPrevStep(),
          },
        ]}
        isOpen={!!prevStep}
        onClose={() => setPrevStep(null)}
      />

      {/* no changes */}
      <ConfirmModal
        title={t("no-changes.title")}
        description={t("no-changes.description")}
        buttons={[
          {
            text: t("no-changes.cancel"),
            variant: "bordered",
            onClick: () => setOpenedModal(null),
          },
          {
            text: t("no-changes.confirm"),
            color: "danger",
            onClick: closeHandler,
          },
        ]}
        isOpen={openedModal === "no-changes"}
        onClose={() => setOpenedModal(null)}
      />
    </>
  );
};
