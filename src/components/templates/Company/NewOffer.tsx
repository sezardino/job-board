import { ConfirmModal } from "@/components/UI/ConformModal/ConfirmModal";
import { TitleDescription } from "@/components/UI/TitleDescription/TitleDescription";
import { Button, Grid } from "@/components/base";
import { BaseStepper } from "@/components/base/Stepper/BaseStepper";
import {
  OfferFormDescriptionStep,
  OfferFormDescriptionStepFormValues,
} from "@/components/forms/OfferSteps/Description";
import {
  OfferFormDetailsStep,
  OfferFormDetailsStepFormValues,
} from "@/components/forms/OfferSteps/Details";
import {
  OfferFormSkillsStep,
  OfferFormSkillsStepFormValues,
} from "@/components/forms/OfferSteps/Skills";
import {
  OfferFormSpecificationStep,
  OfferFormSpecificationStepFormValues,
} from "@/components/forms/OfferSteps/Specification";
import { OfferPreview } from "@/components/modules/offer/OfferPreview";
import { CompanyPageUrls } from "@/const";
import { ActiveCategoriesResponse } from "@/services/bll/modules/categories/schema";
import { ActiveIndustriesResponse } from "@/services/bll/modules/industries/schema";
import { CreateJobOfferResponse } from "@/services/bll/modules/job-offers/schema";
import { ActionProp, DataProp } from "@/types";
import { useTranslations } from "next-intl";
import { ComponentPropsWithoutRef, FC, useState } from "react";
import { twMerge } from "tailwind-merge";

type Props = {
  industries: DataProp<ActiveIndustriesResponse>;
  categories: DataProp<ActiveCategoriesResponse>;
  onSelectIndustry: (value: string) => void;
  onCreateOfferRequest: ActionProp<
    Required<NewOfferData>,
    CreateJobOfferResponse
  >;
};

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

export type NewOfferTemplateProps = ComponentPropsWithoutRef<"section"> & Props;

export const NewOfferTemplate: FC<NewOfferTemplateProps> = (props) => {
  const {
    industries,
    categories,
    onSelectIndustry,
    onCreateOfferRequest,
    className,
    ...rest
  } = props;
  const t = useTranslations("page.company.new-offer");

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
      await onCreateOfferRequest.handler(values as Required<NewOfferData>);

      setIsConfirmModalOpen(false);
    } catch (error) {}
  };

  const filledCount = Object.keys(values).length;

  return (
    <>
      <section {...rest} className={className}>
        <Grid
          {...rest}
          gap={10}
          className={twMerge("max-w-xl mx-auto", className)}
        >
          <TitleDescription
            titleLevel="h1"
            title={t("title")}
            description={t("desc")}
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
              onFormSubmit={(data) =>
                saveStepData({ step: "description", data })
              }
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
                  {t("to-first-step")}
                </Button>
                <Button
                  color="primary"
                  onClick={() => setIsConfirmModalOpen(true)}
                >
                  {t("confirm")}
                </Button>
              </div>
            </Grid>
          )}
        </Grid>
      </section>

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
