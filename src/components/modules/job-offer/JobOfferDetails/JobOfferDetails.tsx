import { SkillCard } from "@/components/UI/SkillCard/SkillCard";
import { Icon, Link, Typography } from "@/components/base";
import { BaseAvatar } from "@/components/base/Avatar/BaseAvatar";
import {
  BaseBreadcrumbs,
  BreadcrumbItem,
} from "@/components/base/Breadcrumbs/BaseBreadcrumbs";
import { HTMLWrapper } from "@/components/base/HTMLWrapper/HTMLWrapper";
import { PublicPageUrls } from "@/const";
import { Card, CardProps } from "@nextui-org/react";
import { JobContract, JobType, Seniority, Skill } from "@prisma/client";
import { FC, useMemo } from "react";

import { useTranslations } from "next-intl";
import { twMerge } from "tailwind-merge";
import styles from "./JobOfferDetails.module.scss";

export type JovOfferDetailsInfoItem = { label: string; value: string };

type Props = {
  breadcrumbs?: BreadcrumbItem[];
  company: { id: string; name: string; logo: { url: string | null } };
  skills: Skill[];
  offer: {
    name: string;
    description: string;
    contract: JobContract[];
    seniority: Seniority;
    type: JobType;
  };
};

export type JobOfferDetailsProps = CardProps & Props;

export const JobOfferDetails: FC<JobOfferDetailsProps> = (props) => {
  const { offer, company, skills, breadcrumbs, className, ...rest } = props;

  const t = useTranslations("components.job-offer-details");
  const entityT = useTranslations("entity");

  const info = useMemo(
    () => [
      {
        label: t("contract"),
        value: offer.contract
          .map((c) => entityT(`job-contract.${c}`))
          .join(", "),
      },

      { label: t("seniority"), value: entityT(`seniority.${offer.seniority}`) },
      { label: t("type"), value: entityT(`job-type.${offer.type}`) },
      // {
      //   label: t("deadline"),
      //   value: dayjs(offer.deadlineAt).format(DEFAULT_DATE_FORMAT),
      // },
    ],
    [offer, entityT, t]
  );

  return (
    <Card as="section" {...rest} className={twMerge(styles.element, className)}>
      <header className={styles.header}>
        {!!breadcrumbs?.length && <BaseBreadcrumbs items={breadcrumbs} />}

        <div className={styles.base}>
          <BaseAvatar
            type="image"
            size="lg"
            src={company.logo.url || undefined}
            alt={company.name}
          />

          <div className={styles.wrapper}>
            <Typography tag="h1" styling="xl" weight="bold">
              {offer.name}
            </Typography>
            <Link href={PublicPageUrls.company(company.id)}>
              <Typography tag="p" styling="sm" className={styles.link}>
                {company.name}
              </Typography>
              <Icon name="HiArrowRight" size={14} className={styles.icon} />
            </Link>
          </div>
        </div>

        <ul className={styles.infoList}>
          {info.map((item) => (
            <li key={item.label} className={styles.infoItem}>
              <Typography tag="p" styling="sm" className={styles.info}>
                {item.label} - <b>{item.value}</b>
              </Typography>
            </li>
          ))}
        </ul>

        {!!skills.length && (
          <ul className={styles.skills}>
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
      </header>

      {/* Job Description */}
      {offer.description && <HTMLWrapper body={offer.description} />}
    </Card>
  );
};
