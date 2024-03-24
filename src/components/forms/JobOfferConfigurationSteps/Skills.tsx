import { useMemo, type ComponentPropsWithoutRef, type FC } from "react";

import { TitleDescription } from "@/components/UI/TitleDescription/TitleDescription";
import { Icon } from "@/components/base";
import { ControlledInput, ControlledSelect } from "@/components/controlled";
import { MAX_STRING_LENGTH } from "@/const";
import { Button } from "@nextui-org/react";
import { Skill, SkillLevel } from "@prisma/client";
import { FieldArray, useFormik } from "formik";
import { useTranslations } from "next-intl";
import { twMerge } from "tailwind-merge";
import { z } from "zod";
import { toFormikValidationSchema } from "zod-formik-adapter";
import { FormWrapper } from "../FormWrapper/FormWrapper";

export type OfferFormSkillsStepFormValues = {
  skills: Skill[];
};

type Props = {
  initialValues?: Partial<OfferFormSkillsStepFormValues>;
  onFormSubmit: (values: OfferFormSkillsStepFormValues) => void;
  onBackClick: (dirty: boolean) => void;
  backCopy?: string;
  nextCopy?: string;
};

export type OfferFormSkillsStepProps = ComponentPropsWithoutRef<"form"> & Props;

const BASIC_SKILL = { name: "", level: SkillLevel.BASIC };

export const OfferFormSkillsStep: FC<OfferFormSkillsStepProps> = (props) => {
  const {
    backCopy,
    nextCopy,
    initialValues,
    onFormSubmit,
    onBackClick,
    className,
    ...rest
  } = props;

  const t = useTranslations("forms.job-offer-skills");
  const entityT = useTranslations("entity");

  const validationSchema = useMemo(
    () =>
      toFormikValidationSchema(
        z.object({
          skills: z.array(
            z.object({
              name: z
                .string({ required_error: t("name.required") })
                .max(
                  MAX_STRING_LENGTH,
                  t("name.max-length", { value: MAX_STRING_LENGTH })
                ),
              level: z.nativeEnum(SkillLevel, {
                required_error: t("level.required"),
              }),
            })
          ),
        })
      ),
    [t]
  );

  const formik = useFormik<OfferFormSkillsStepFormValues>({
    onSubmit: onFormSubmit,
    validationSchema,
    initialValues: {
      skills: [],
      ...props.initialValues,
    },
  });

  const skillLevelOptions = useMemo(
    () =>
      Object.values(SkillLevel).map((value) => ({
        id: value,
        label: entityT(`skill-level.${value}`),
      })),
    [entityT]
  );

  const addFirstSkill = () => formik.setFieldValue("skills", [BASIC_SKILL]);

  return (
    <FormWrapper
      {...rest}
      formik={formik}
      submit={{ label: nextCopy ? nextCopy : t("next") }}
      cancel={{
        label: backCopy ? backCopy : t("back"),
        onClick: () => onBackClick(formik.dirty),
      }}
      className={twMerge("", className)}
    >
      <TitleDescription
        titleLevel="h2"
        title={t("title")}
        description={t("description")}
      />
      {!formik.values.skills.length && (
        <Button color="primary" variant="bordered" onClick={addFirstSkill}>
          {t("add-first")}
        </Button>
      )}

      {!!formik.values.skills.length && (
        <FieldArray
          name="skills"
          render={(helpers) => (
            <div className="grid grid-cols-1 gap-2">
              {formik.values.skills.map((_, i, arr) => (
                <div key={i} className={twMerge("flex items-start gap-1")}>
                  <ControlledInput
                    name={`skills.[${i}].name`}
                    labelPlacement="inside"
                    label={t("name.label")}
                    placeholder={t("name.placeholder")}
                  />

                  <ControlledSelect
                    name={`skills.[${i}].level`}
                    isMultiple={false}
                    labelPlacement="inside"
                    label={t("level.label")}
                    placeholder={t("level.placeholder")}
                    options={skillLevelOptions}
                  />

                  <div className="mt-2 flex gap-1 items-center">
                    <Button
                      isIconOnly
                      color="danger"
                      variant="light"
                      onClick={() => helpers.remove(i)}
                      aria-label={t("remove")}
                    >
                      <Icon name="HiTrash" size={16} />
                    </Button>
                    <Button
                      isIconOnly
                      color="default"
                      size="sm"
                      variant="flat"
                      isDisabled={i === 0}
                      onClick={() => helpers.move(i, i - 1)}
                      aria-label={t("up")}
                    >
                      <Icon name="HiChevronUp" size={16} />
                    </Button>
                    <Button
                      size="sm"
                      isIconOnly
                      color="default"
                      variant="flat"
                      isDisabled={i === arr.length - 1}
                      onClick={() => helpers.move(i, i + 1)}
                      aria-label={t("down")}
                    >
                      <Icon name="HiChevronDown" size={16} />
                    </Button>
                  </div>
                </div>
              ))}
              <Button
                isIconOnly
                className="justify-self-center"
                onClick={() => helpers.push(BASIC_SKILL)}
                aria-label={t("add")}
              >
                <Icon name="HiPlus" size={16} />
              </Button>
            </div>
          )}
        />
      )}
    </FormWrapper>
  );
};
