import { Button, Grid } from "@/components/base";
import { BaseStepper } from "@/components/base/Stepper/BaseStepper";
import { ActiveCategoriesResponse } from "@/services/server/modules/categories/schema";
import { ActiveIndustriesResponse } from "@/services/server/modules/industries/schema";
import { DataProp } from "@/types";
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
  const [step, setStep] = useState<OfferFormStep>("details");
  const [values, setValues] = useState<NewOfferData>({});

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

  return (
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
        />
      )}

      {step === "specification" && (
        <OfferFormSpecificationStep
          initialValues={values.specification}
          onFormSubmit={(data) => saveStepData({ step: "specification", data })}
        />
      )}

      {step === "skills" && (
        <OfferFormSkillsStep
          initialValues={values.skills}
          onFormSubmit={(data) => saveStepData({ step: "skills", data })}
        />
      )}

      {step === "description" && (
        <OfferFormDescriptionStep
          initialValues={values.description}
          onFormSubmit={(data) => saveStepData({ step: "description", data })}
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
  );
};
