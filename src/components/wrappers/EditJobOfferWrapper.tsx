import { useEditJobOfferMutation } from "@/hooks/react-query/mutation/job-offers/edit";
import { useJobOfferEditionDataQuery } from "@/hooks/react-query/query/job-offers/data-for-edition";
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
} from "../forms/JobOfferConfigurationSteps/Description";
import {
  OfferFormSkillsStep,
  OfferFormSkillsStepFormValues,
} from "../forms/JobOfferConfigurationSteps/Skills";

const editOfferFormSteps = {
  skills: "skills",
  description: "description",
} as const;

type OfferFormStep =
  (typeof editOfferFormSteps)[keyof typeof editOfferFormSteps];

const stepsArray: OfferFormStep[] = Object.values(editOfferFormSteps);

export type EditJobOfferData = {
  skills?: OfferFormSkillsStepFormValues;
  description?: OfferFormDescriptionStepFormValues;
};

type SaveStepData =
  | { step: "skills"; data: OfferFormSkillsStepFormValues }
  | { step: "description"; data: OfferFormDescriptionStepFormValues };

type Props = {
  jobOfferId?: string;
  onClose: () => void;
};

type WrapperModals = "confirm" | "cancel" | "back" | "no-changes";

export type EditJobOfferProps = Props;

export const EditJobOfferWrapper: FC<EditJobOfferProps> = (props) => {
  const { jobOfferId, onClose } = props;
  const t = useTranslations("components.edit-job-offer-wrapper");

  const { data: editionData, isFetching: isEditionDataLoading } =
    useJobOfferEditionDataQuery(jobOfferId);
  const { mutateAsync: editJobOffer, isPending: isEditJobOfferLoading } =
    useEditJobOfferMutation();

  const [step, setStep] = useState<OfferFormStep>("skills");
  const [values, setValues] = useState<EditJobOfferData>({});
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

  const confirmHandler = useCallback(() => {
    if (!editionData) return false;

    if (!values.skills && !values.description) {
      setOpenedModal("no-changes");
      return;
    }

    const { description, skills } = values;

    const isSkillsChanged =
      JSON.stringify(skills) !== JSON.stringify({ skills: editionData.skills });

    const isDescriptionChanged =
      description?.description !== editionData.description;

    if (!isSkillsChanged && !isDescriptionChanged) {
      setOpenedModal("no-changes");
      return;
    }

    setOpenedModal("confirm");
  }, [editionData, values]);

  const saveStepData = (value: SaveStepData) => {
    const { step, data } = value;

    switch (step) {
      case "skills": {
        const isSkillsChanged =
          JSON.stringify(values.skills) !==
          JSON.stringify({
            skills: editionData?.skills,
          });

        if (isSkillsChanged) setValues((prev) => ({ ...prev, skills: data }));
        if (!isSkillsChanged)
          setValues((prev) => ({ ...prev, skills: undefined }));
        setStep("description");
        break;
      }
      case "description": {
        const isDescriptionChanged =
          data.description.trim() !== editionData?.description.trim();

        if (isDescriptionChanged)
          setValues((prev) => ({ ...prev, description: data }));

        if (!isDescriptionChanged)
          setValues((prev) => ({ ...prev, description: undefined }));

        confirmHandler();
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

  const editJobOfferHandler = useCallback(async () => {
    if (!jobOfferId) return;
    if (!values.skills && !values.description) return;

    try {
      await editJobOffer({
        id: jobOfferId,
        description: values.description?.description,
        skills: values.skills?.skills,
      });

      closeHandler();
    } catch (error) {}
  }, [
    closeHandler,
    editJobOffer,
    jobOfferId,
    values.description,
    values.skills,
  ]);

  return (
    <>
      {isEditionDataLoading && <LoadingOverlay />}

      <Modal
        isOpen={!!jobOfferId}
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
            onClick: editJobOfferHandler,
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
