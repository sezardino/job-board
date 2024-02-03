import { ConfirmModal } from "@/components/UI/ConformModal/ConfirmModal";
import { Button, Grid } from "@/components/base";
import { BaseStepper } from "@/components/base/Stepper/BaseStepper";
import { CompanyPageUrls } from "@/const";
import { ActiveCategoriesResponse } from "@/services/server/modules/categories/schema";
import { ActiveIndustriesResponse } from "@/services/server/modules/industries/schema";
import { DataProp } from "@/types";
import { useTranslations } from "next-intl";
import { useState, type ComponentPropsWithoutRef, type FC } from "react";
import { twMerge } from "tailwind-merge";
import {
  OfferFormDescriptionStep,
  OfferFormDescriptionStepFormValues,
} from "./steps/Description";
import {
  OfferFormDetailsStep,
  OfferFormDetailsStepFormValues,
} from "./steps/Details";
import {
  OfferFormSkillsStep,
  OfferFormSkillsStepFormValues,
} from "./steps/Skills";
import {
  OfferFormSpecificationStep,
  OfferFormSpecificationStepFormValues,
} from "./steps/Specification";

type Props = {
  industries: DataProp<ActiveIndustriesResponse>;
  categories: DataProp<ActiveCategoriesResponse>;
  onSelectIndustry: (value: string) => void;
};

export type OfferFormProps = ComponentPropsWithoutRef<"section"> & Props;

const offerFormSteps = {
  details: "details",
  specification: "specification",
  skills: "skills",
  description: "description",
  preview: "preview",
} as const;

type OfferFormStep = (typeof offerFormSteps)[keyof typeof offerFormSteps];

const stepsArray: OfferFormStep[] = Object.values(offerFormSteps);

type NewOfferData = {
  details?: OfferFormDetailsStepFormValues;
  specification?: OfferFormSpecificationStepFormValues;
  skills?: OfferFormSkillsStepFormValues;
  description?: OfferFormDescriptionStepFormValues;
};

type SaveStepData =
  | { step: "details"; data: OfferFormDetailsStepFormValues }
  | { step: "specification"; data: OfferFormSpecificationStepFormValues }
  | { step: "skills"; data: OfferFormSkillsStepFormValues }
  | { step: "description"; data: OfferFormDescriptionStepFormValues };

export const OfferForm: FC<OfferFormProps> = (props) => {
  const { industries, categories, onSelectIndustry, className, ...rest } =
    props;
  const t = useTranslations("forms.offer");

  const [step, setStep] = useState<OfferFormStep>("skills");
  const [values, setValues] = useState<NewOfferData>({});
  const [prevStep, setPrevStep] = useState<OfferFormStep | null>(null);
  const [isCancelModalOpen, setIsCancelModalOpen] = useState(false);

  const saveStepData = (value: SaveStepData) => {
    switch (value.step) {
      case "details":
        setValues((prev) => ({ ...prev, details: value.data }));
        setStep("specification");
        break;
      case "specification":
        setValues((prev) => ({ ...prev, specification: value.data }));
        setStep("skills");
        break;
      case "skills":
        setValues((prev) => ({ ...prev, skills: value.data }));
        setStep("description");
        break;
      case "description":
        setValues((prev) => ({ ...prev, description: value.data }));
        setStep("preview");
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

  return (
    <>
      <Grid {...rest} gap={4} className={twMerge(className)}>
        <BaseStepper
          count={stepsArray.length}
          currentCount={stepsArray.findIndex((i) => i === step)}
        />
        {step === "details" && (
          <OfferFormDetailsStep
            initialValues={values.details}
            industries={industries}
            categories={categories}
            onSelectIndustry={onSelectIndustry}
            onFormSubmit={(data) => saveStepData({ step: "details", data })}
            onCancelClick={() => setIsCancelModalOpen(true)}
          />
        )}

        {step === "specification" && (
          <OfferFormSpecificationStep
            initialValues={values.specification}
            onFormSubmit={(data) =>
              saveStepData({ step: "specification", data })
            }
            onBackClick={(dirty) =>
              dirty ? setPrevStep("details") : setStep("details")
            }
          />
        )}

        {step === "skills" && (
          <OfferFormSkillsStep
            initialValues={values.skills}
            onFormSubmit={(data) => saveStepData({ step: "skills", data })}
            onBackClick={(dirty) =>
              dirty ? setPrevStep("specification") : setStep("specification")
            }
          />
        )}

        {step === "description" && (
          <OfferFormDescriptionStep
            initialValues={values.description}
            onFormSubmit={(data) => saveStepData({ step: "description", data })}
            onBackClick={(dirty) =>
              dirty ? setPrevStep("skills") : setStep("skills")
            }
          />
        )}

        {step === "preview" && (
          <>
            <pre>{JSON.stringify(values, undefined, " ")}</pre>
            <div className="flex items-center flex-wrap gap-3 justify-between">
              <Button onClick={() => setStep("description")}>Back</Button>
              <Button onClick={() => setStep("details")}>Reset</Button>
            </div>
          </>
        )}
      </Grid>

      <ConfirmModal
        title={t("cancel-modal.title")}
        description={t("cancel-modal.description")}
        cancel={{
          text: t("cancel-modal.cancel"),
          onClick: () => setIsCancelModalOpen(false),
        }}
        confirm={{
          text: t("cancel-modal.confirm"),
          href: CompanyPageUrls.offers,
        }}
        isOpen={isCancelModalOpen}
        onClose={() => setIsCancelModalOpen(false)}
      />

      <ConfirmModal
        title={t("back-modal.title")}
        description={t("back-modal.description")}
        cancel={{
          text: t("back-modal.cancel"),
          onClick: () => setPrevStep(null),
        }}
        confirm={{
          text: t("back-modal.confirm"),
          onClick: () => toPrevStep(),
        }}
        isOpen={!!prevStep}
        onClose={() => setPrevStep(null)}
      />
    </>
  );
};
