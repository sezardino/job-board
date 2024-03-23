import { useTranslations } from "next-intl";
import { FC, useCallback, useState } from "react";
import { ConfirmModal } from "../UI/ConformModal/ConfirmModal";
import { TitleDescription } from "../UI/TitleDescription/TitleDescription";
import { Grid, Modal } from "../base";
import { BaseStepper } from "../base/Stepper/BaseStepper";
import {
  OfferFormDescriptionStep,
  OfferFormDescriptionStepFormValues,
} from "../forms/OfferSteps/Description";
import {
  OfferFormSkillsStep,
  OfferFormSkillsStepFormValues,
} from "../forms/OfferSteps/Skills";

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
  offerId?: string;
  onClose: () => void;
};

export type EditJobOfferProps = Props;

export const EditJobOfferWrapper: FC<EditJobOfferProps> = (props) => {
  const { offerId, onClose } = props;

  const t = useTranslations("components.edit-job-offer-modal-wrapper");

  const [step, setStep] = useState<OfferFormStep>("skills");
  const [values, setValues] = useState<EditJobOfferData>({});
  const [prevStep, setPrevStep] = useState<OfferFormStep | null>(null);
  const [isCancelModalOpen, setIsCancelModalOpen] = useState(false);
  const [isConfirmModalOpen, setIsConfirmModalOpen] = useState(false);

  const saveStepData = (value: SaveStepData) => {
    switch (value.step) {
      case "skills":
        setValues((prev) => ({ ...prev, skills: value.data }));
        setStep("description");
        break;
      case "description":
        setValues((prev) => ({ ...prev, description: value.data }));
        setIsConfirmModalOpen(true);
        break;
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
  }, [onClose]);

  const skillsBackButtonHandler = (dirty: boolean) => {
    // not dirty and no data was changed
    if (!dirty) {
      closeHandler();
    }

    setIsCancelModalOpen(true);
  };

  const editJobOfferHandler = useCallback(() => {
    // TODO: add edition logic

    setIsConfirmModalOpen(false);
    closeHandler();
  }, [closeHandler]);

  if (!offerId) return null;

  return (
    <>
      <Modal isOpen size="5xl" onClose={onClose}>
        <Modal.Header>
          <Grid gap={10}>
            <TitleDescription
              titleLevel="h1"
              title={t("edit.title")}
              description={t("edit.description")}
              isTextCentered
            />
            <BaseStepper
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
              initialValues={values.skills}
              onFormSubmit={(data) => saveStepData({ step: "skills", data })}
              onBackClick={skillsBackButtonHandler}
              backCopy={t("edit.cancel")}
              nextCopy={t("edit.next")}
            />
          )}

          {step === "description" && (
            <OfferFormDescriptionStep
              initialValues={values.description}
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
            onClick: () => setIsConfirmModalOpen(false),
          },
          {
            text: t("confirm.confirm"),
            onClick: editJobOfferHandler,
          },
        ]}
        isOpen={isConfirmModalOpen}
        onClose={() => setIsConfirmModalOpen(false)}
      />

      {/* cancel when min one step was changed */}
      <ConfirmModal
        title={t("cancel.title")}
        description={t("cancel.description")}
        buttons={[
          {
            text: t("cancel.cancel"),
            variant: "bordered",
            onClick: () => setIsCancelModalOpen(false),
          },
          {
            text: t("cancel.confirm"),
            color: "primary",
            onClick: closeHandler,
          },
        ]}
        isOpen={isCancelModalOpen}
        onClose={() => setIsCancelModalOpen(false)}
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
    </>
  );
};
