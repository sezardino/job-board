import { useMemo, type ComponentPropsWithoutRef, type FC } from "react";

import { TitleDescription } from "@/components/UI/TitleDescription/TitleDescription";
import { Grid } from "@/components/base/Grid/Grid";
import { HTMLWrapper } from "@/components/base/HTMLWrapper/HTMLWrapper";
import { Typography } from "@/components/base/Typography/Typography";
import {
  JobContract,
  JobOperatingMode,
  JobType,
  Seniority,
  Skill,
} from "@prisma/client";
import { useTranslations } from "next-intl";
import { twMerge } from "tailwind-merge";

import { SkillsList } from "../SkillsList/SkillsList";

export interface OfferPreviewProps extends ComponentPropsWithoutRef<"div"> {
  industry: string;
  category: string;
  name: string;
  contract: JobContract[];
  seniority: Seniority;
  type: JobType;
  skills: Skill[];
  description: string;
  salary: { from: number; to: number } | null;
  operating: JobOperatingMode[];
}

export const OfferPreview: FC<OfferPreviewProps> = (props) => {
  const {
    salary,
    industry,
    category,
    operating,
    name,
    contract,
    seniority,
    type,
    skills,
    description,
    className,
    ...rest
  } = props;
  const t = useTranslations("components.offer-preview");
  const entityT = useTranslations("entity");

  const details = useMemo(
    () => [
      {
        label: t("details.industry"),
        value: entityT(`industries.${industry}`),
      },
      {
        label: t("details.category"),
        value: entityT(`categories.${category}`),
      },
      {
        label: t("details.contract"),
        value: contract.map((c) => entityT(`offers.contract.${c}`)).join(", "),
      },
      {
        label: t("details.salary.label"),
        value: salary
          ? t("details.salary.value", salary)
          : t("details.salary.no-value"),
      },
      {
        label: t("details.seniority"),
        value: entityT(`seniority.${seniority}`),
      },
      { label: t("details.type"), value: entityT(`offers.type.${type}`) },
      {
        label: t("details.operating"),
        value: operating
          .map((o) => entityT(`offers.operating.${o}`))
          .join(", "),
      },
    ],
    [
      category,
      contract,
      entityT,
      industry,
      operating,
      salary,
      seniority,
      t,
      type,
    ]
  );

  return (
    <Grid gap={10} tag="article" {...rest} className={twMerge(className)}>
      <Typography tag="h2" styling="xl" weight="bold">
        {name}
      </Typography>

      <Grid gap={5}>
        <TitleDescription
          titleLevel="h3"
          title={t("details.title")}
          description={t("details.description")}
        />
        <ul className="list-none grid grid-cols-2">
          {details.map((item) => (
            <li key={item.label} className="py-2 border-b">
              <Typography tag="p" styling="sm" className="inline">
                {item.label} - <b>{item.value}</b>
              </Typography>
            </li>
          ))}
        </ul>
      </Grid>

      <SkillsList
        title={t("skills.title")}
        description={t("skills.description")}
        noData={t("skills.no-data")}
        skills={skills}
      />

      <Grid gap={5}>
        <TitleDescription
          titleLevel="h3"
          title={t("description.title")}
          description={t("description.description")}
        />
        <HTMLWrapper body={description} />
      </Grid>
    </Grid>
  );
};
