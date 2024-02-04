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
import { FormWrapper } from "../../FormWrapper/FormWrapper";

export type OfferFormSkillsStepFormValues = {
  skills: Skill[];
};

type Props = {
  initialValues?: Partial<OfferFormSkillsStepFormValues>;
  onFormSubmit: (values: OfferFormSkillsStepFormValues) => void;
  onBackClick: (dirty: boolean) => void;
};

export type OfferFormSkillsStepProps = ComponentPropsWithoutRef<"form"> & Props;

const BASIC_SKILL = { name: "", level: SkillLevel.BASIC };

export const OfferFormSkillsStep: FC<OfferFormSkillsStepProps> = (props) => {
  const { initialValues, onFormSubmit, onBackClick, className, ...rest } =
    props;
  const t = useTranslations("forms.offer");
  const entityT = useTranslations("entity");

  const validationSchema = useMemo(
    () =>
      toFormikValidationSchema(
        z.object({
          skills: z.array(
            z.object({
              name: z
                .string({ required_error: t("skills.name.required") })
                .max(
                  MAX_STRING_LENGTH,
                  t("skills.name.max-length", { value: MAX_STRING_LENGTH })
                ),
              level: z.nativeEnum(SkillLevel, {
                required_error: t("skills.level.required"),
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
      submit={{ label: t("next") }}
      cancel={{ label: t("back"), onClick: () => onBackClick(formik.dirty) }}
      className={twMerge("", className)}
    >
      <TitleDescription
        titleLevel="h2"
        title={t("skills.title")}
        description={t("skills.description")}
      />
      {!formik.values.skills.length && (
        <Button color="primary" variant="bordered" onClick={addFirstSkill}>
          {t("skills.add-first")}
        </Button>
      )}

      {!!formik.values.skills.length && (
        <FieldArray
          name="skills"
          render={(helpers) => (
            <div className="grid grid-cols-1 gap-2">
              {formik.values.skills.map((_, i) => (
                <div
                  key={i}
                  className={twMerge(
                    "grid items-start gap-1 grid-cols-[1fr_1fr_auto]"
                  )}
                >
                  <ControlledInput
                    name={`skills.[${i}].name`}
                    labelPlacement="inside"
                    label={t("skills.name.label")}
                    placeholder={t("skills.name.placeholder")}
                  />
                  <ControlledSelect
                    name={`skills.[${i}].level`}
                    labelPlacement="inside"
                    label={t("skills.level.label")}
                    placeholder={t("skills.level.placeholder")}
                    options={skillLevelOptions}
                  />

                  <Button
                    isIconOnly
                    color="danger"
                    variant="light"
                    className="mt-2"
                    onClick={() => helpers.remove(i)}
                    aria-label={t("skills.remove")}
                  >
                    <Icon name="HiTrash" size={16} />
                  </Button>
                </div>
              ))}
              <Button
                isIconOnly
                className="justify-self-center"
                onClick={() => helpers.push(BASIC_SKILL)}
                aria-label={t("skills.add")}
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
