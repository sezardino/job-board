import { SkillCard } from "@/components/UI/SkillCard/SkillCard";
import { BaseAvatar } from "@/components/base/Avatar/BaseAvatar";
import {
  BaseBreadcrumbs,
  BreadcrumbItem,
} from "@/components/base/Breadcrumbs/BaseBreadcrumbs";
import { HTMLWrapper } from "@/components/base/HTMLWrapper/HTMLWrapper";
import { PublicPageUrls } from "@/const";
import { Card, CardBody, CardHeader, Link } from "@nextui-org/react";
import { JobContract, JobType, Seniority, Skill } from "@prisma/client";
import { ComponentPropsWithoutRef, FC, useMemo } from "react";

import { Icon } from "@/components/base/Icon/Icon";
import { Typography } from "@/components/base/Typography/Typography";
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

export type JobOfferDetailsProps = ComponentPropsWithoutRef<"div"> & Props;

export const JobOfferDetails: FC<JobOfferDetailsProps> = (props) => {
  const { offer, company, skills, breadcrumbs, className, ...rest } = props;

  const t = useTranslations("components.job-offer-details");
  const entityT = useTranslations("entity");

  const info = useMemo(
    () => [
      {
        label: t("contract"),
        value: offer.contract
          .map((c) => entityT(`job-offer.contract.${c}`))
          .join(", "),
      },

      {
        label: t("seniority"),
        value: entityT(`job-offer.seniority.${offer.seniority}`),
      },
      { label: t("type"), value: entityT(`job-offer.type.${offer.type}`) },
      // {
      //   label: t("deadline"),
      //   value: dayjs(offer.deadlineAt).format(DEFAULT_DATE_FORMAT),
      // },
    ],
    [offer, entityT, t]
  );

  return (
    <div {...rest} className={twMerge(styles.element, className)}>
      {!!breadcrumbs?.length && <BaseBreadcrumbs items={breadcrumbs} />}

      <Card as="section">
        <CardHeader>
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
        </CardHeader>

        <CardBody>
          <ul className={styles.infoList}>
            {info.map((item) => (
              <li key={item.label}>
                <Typography tag="p" styling="sm">
                  {item.label} - <b>{item.value}</b>
                </Typography>
              </li>
            ))}
          </ul>
        </CardBody>
      </Card>

      <Card>
        <CardHeader>
          <Typography tag="h2" styling="lg">
            {t("skills.title")}
          </Typography>
        </CardHeader>
        <CardBody>
          {!skills.length && (
            <Typography tag="p">{t("skills.no-data")}</Typography>
          )}

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
        </CardBody>
      </Card>

      {/* Job Description */}
      <Card>
        <CardHeader>
          <Typography tag="h2" styling="lg">
            {t("description.title")}
          </Typography>
        </CardHeader>
        <CardBody>
          {!offer.description && (
            <Typography tag="p">{t("description.no-data")}</Typography>
          )}

          {offer.description && <HTMLWrapper body={offer.description} />}
        </CardBody>
      </Card>
    </div>
  );
};
