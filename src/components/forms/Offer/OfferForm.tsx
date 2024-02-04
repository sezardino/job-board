import { ConfirmModal } from "@/components/UI/ConformModal/ConfirmModal";
import { TitleDescription } from "@/components/UI/TitleDescription/TitleDescription";
import { Button, Grid } from "@/components/base";
import { BaseStepper } from "@/components/base/Stepper/BaseStepper";
import { OfferPreview } from "@/components/modules/offer/OfferPreview";
import { CompanyPageUrls } from "@/const";
import { ActiveCategoriesResponse } from "@/services/server/modules/categories/schema";
import { ActiveIndustriesResponse } from "@/services/server/modules/industries/schema";
import { CreateJobOfferResponse } from "@/services/server/modules/job-offers/schema";
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
  onFormSubmit: (
    values: Required<NewOfferData>
  ) => Promise<CreateJobOfferResponse>;
  isLoading: boolean;
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

export type NewOfferData = {
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
  const {
    industries,
    categories,
    onSelectIndustry,
    onFormSubmit,
    className,
    ...rest
  } = props;
  const t = useTranslations("forms.offer");

  const [step, setStep] = useState<OfferFormStep>("details");
  const [values, setValues] = useState<NewOfferData>({});
  const [prevStep, setPrevStep] = useState<OfferFormStep | null>(null);
  const [isCancelModalOpen, setIsCancelModalOpen] = useState(false);
  const [isConfirmModalOpen, setIsConfirmModalOpen] = useState(false);

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

  const confirmJobOfferCreation = async () => {
    if (
      !values.details &&
      !values.specification &&
      !values.skills &&
      !values.description
    )
      return;
    try {
      await onFormSubmit(values as Required<NewOfferData>);

      setIsConfirmModalOpen(false);
    } catch (error) {}
  };

  const filledCount = Object.keys(values).length;

  return (
    <>
      <Grid
        {...rest}
        gap={10}
        className={twMerge("max-w-xl mx-auto", className)}
      >
        <TitleDescription
          titleLevel="h1"
          title={t("new.title")}
          description={t("new.description")}
        />
        <BaseStepper
          count={stepsArray.length}
          filledCount={filledCount}
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
          <Grid gap={5}>
            <TitleDescription
              title={t("preview.title")}
              titleStyling="md"
              titleLevel="h2"
              description={t("preview.description")}
            />

            {values.description &&
              values.details &&
              values.specification &&
              values.skills &&
              values.description && (
                <>
                  <OfferPreview
                    industry={values.details.industry}
                    category={values.details.category}
                    contract={values.specification.contract}
                    description={values.description.description}
                    seniority={values.specification.seniority}
                    name={values.details.name}
                    operating={values.specification.operating}
                    salary={values.details.salary}
                    skills={values.skills.skills}
                    type={values.specification.type}
                  />
                </>
              )}
            <div className="flex items-center flex-wrap gap-3 justify-between">
              <Button variant="bordered" onClick={() => setStep("details")}>
                {t("preview.to-first-step")}
              </Button>
              <Button
                color="primary"
                onClick={() => setIsConfirmModalOpen(true)}
              >
                {t("new.confirm")}
              </Button>
            </div>
          </Grid>
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

      <ConfirmModal
        title={t("confirm-modal.title")}
        description={t("confirm-modal.description")}
        cancel={{
          text: t("confirm-modal.cancel"),
          onClick: () => setIsConfirmModalOpen(false),
        }}
        confirm={{
          text: t("confirm-modal.confirm"),
          onClick: confirmJobOfferCreation,
        }}
        isOpen={isConfirmModalOpen}
        onClose={() => setIsConfirmModalOpen(false)}
      />
    </>
  );
};
