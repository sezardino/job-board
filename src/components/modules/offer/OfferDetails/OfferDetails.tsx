import { SkillCard } from "@/components/UI/SkillCard/SkillCard";
import { BaseAvatar } from "@/components/base/Avatar/BaseAvatar";
import {
  BaseBreadcrumbs,
  BreadcrumbItem,
} from "@/components/base/Breadcrumbs/BaseBreadcrumbs";
import { HTMLWrapper } from "@/components/base/HTMLWrapper/HTMLWrapper";
import { PublicPageUrls } from "@/const";
import { Card, CardBody, CardHeader, Link, Skeleton } from "@nextui-org/react";
import {
  JobContract,
  JobOperatingMode,
  JobType,
  Seniority,
  Skill,
} from "@prisma/client";
import { ComponentPropsWithoutRef, FC } from "react";

import { Icon } from "@/components/base/Icon/Icon";
import { Typography } from "@/components/base/Typography/Typography";
import { useTranslations } from "next-intl";
import { twMerge } from "tailwind-merge";
import { OfferBasicData } from "../OfferBasicData/OfferBasicData";
import styles from "./OfferDetails.module.scss";

export type JovOfferDetailsInfoItem = { label: string; value: string };

type Props = {
  isLoading?: boolean;
  breadcrumbs?: BreadcrumbItem[];
  company?: { id: string; name: string; logo: { url: string | null } };
  skills?: Skill[];
  offer?: {
    name: string;
    description: string;
    contract: JobContract[];
    operating: JobOperatingMode[];
    seniority: Seniority;
    type: JobType;
  };
};

export type OfferDetailsProps = ComponentPropsWithoutRef<"div"> & Props;

export const OfferDetails: FC<OfferDetailsProps> = (props) => {
  const { isLoading, offer, company, skills, breadcrumbs, className, ...rest } =
    props;

  const t = useTranslations("components.shared.offer-details");

  return (
    <div {...rest} className={twMerge(styles.element, className)}>
      {!!breadcrumbs?.length && <BaseBreadcrumbs items={breadcrumbs} />}
      {isLoading && <Skeleton className="h-56 rounded-lg" />}
      {company && offer && !isLoading && (
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

          <CardBody className={styles.basic}>
            <OfferBasicData
              contract={offer.contract}
              operating={offer.operating}
              seniority={offer.seniority}
              type={offer.type}
            />
          </CardBody>
        </Card>
      )}

      <Card>
        <CardHeader>
          <Typography tag="h2" styling="lg">
            {t("skills.title")}
          </Typography>
        </CardHeader>
        <CardBody>
          {isLoading && <Skeleton className="h-32 rounded-lg" />}

          {skills && !isLoading && (
            <>
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
            </>
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
          {isLoading && <Skeleton className="h-32 rounded-lg" />}

          {offer && !isLoading && (
            <>
              {!offer.description && (
                <Typography tag="p">{t("description.no-data")}</Typography>
              )}

              {offer.description && <HTMLWrapper body={offer.description} />}
            </>
          )}
        </CardBody>
      </Card>
    </div>
  );
};
