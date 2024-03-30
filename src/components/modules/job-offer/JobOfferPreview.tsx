import { useMemo, type ComponentPropsWithoutRef, type FC } from "react";

import { SkillCard } from "@/components/UI/SkillCard/SkillCard";
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

export interface JobOfferPreviewProps extends ComponentPropsWithoutRef<"div"> {
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

export const JobOfferPreview: FC<JobOfferPreviewProps> = (props) => {
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
        value: contract.map((c) => entityT(`job-contract.${c}`)).join(", "),
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
      { label: t("details.type"), value: entityT(`job-type.${type}`) },
      {
        label: t("details.operating"),
        value: operating.map((o) => entityT(`operating.${o}`)).join(", "),
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

      <Grid gap={5}>
        <TitleDescription
          titleLevel="h3"
          title={t("skills.title")}
          description={t("skills.description")}
        />

        {!skills.length && (
          <Typography tag="p">{t("skills.no-data")}</Typography>
        )}

        {!!skills.length && (
          <ul className="grid gap-1 grid-cols-[repeat(auto-fill,minmax(200px,1fr))]">
            {skills.map((skill, index) => (
              <SkillCard
                as="li"
                key={`${skill.name}-${skill.level}-${index}`}
                name={skill.name}
                level={skill.level}
              />
            ))}
          </ul>
        )}
      </Grid>

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
