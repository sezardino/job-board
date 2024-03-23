import { Button, Icon, Typography } from "@/components/base";
import { JobOfferTemplateWrapper } from "@/components/modules/job-offer/JobOfferTemplateWrapper/JobOfferTemplateWrapper";
import { DEFAULT_DATE_FORMAT, PublicPageUrls } from "@/const";
import { PreviewJobOfferResponse } from "@/services/bll/modules/job-offers/schema";
import { Card, CardBody, CardFooter, CardHeader } from "@nextui-org/react";
import dayjs from "dayjs";
import { useTranslations } from "next-intl";
import { useMemo, type ComponentPropsWithoutRef, type FC } from "react";

import styles from "./JobOfferTemplate.module.scss";

export type JobOfferTemplateProps = ComponentPropsWithoutRef<"div"> & {
  offer: PreviewJobOfferResponse;
};

export const JobOfferTemplate: FC<JobOfferTemplateProps> = (props) => {
  const { offer, className, ...rest } = props;
  const entityT = useTranslations("entity");
  const t = useTranslations("components.job-offer-template");

  const info = useMemo(
    () => [
      {
        label: t("contract"),
        value: entityT(`job-contract.${offer.contract}`),
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

  const published = useMemo(() => {
    const days = dayjs(offer.publishedAt).diff(dayjs(), "day");

    if (days === 0) {
      return t("publication.today");
    }

    if (days === 1) {
      return t("publication.yesterday");
    }

    if (days > 1 && days < 7) {
      return t("publication.days-ago", { value: days });
    }

    return dayjs(offer.publishedAt).format(DEFAULT_DATE_FORMAT);
  }, [offer.publishedAt, t]);

  const breadcrumbs = useMemo(
    () => [
      { href: PublicPageUrls.home, label: t("home") },
      {
        href: PublicPageUrls.industry(offer.industry.name),
        label: entityT(`industries.${offer.industry.name}`),
      },

      {
        href: PublicPageUrls.category(offer.industry.name, offer.category.name),
        label: entityT(`categories.${offer.category.name}`),
      },

      { label: offer.company.name },
    ],
    [entityT, offer.category.name, offer.company.name, offer.industry.name, t]
  );

  return (
    <JobOfferTemplateWrapper
      {...rest}
      breadcrumbs={breadcrumbs}
      company={{
        id: offer.company.id,
        name: offer.company.name,
        logo: { url: offer.company.logo?.url || "" },
      }}
      info={info}
      offer={{
        name: offer.name,
        description: offer.description || "",
      }}
      skills={offer.skills}
      aside={
        <Card as="section" className={styles.aside}>
          <CardHeader className={styles.header}>
            <Typography tag="p" styling="lg" weight="bold">
              {offer.salary?.from}-{offer.salary?.to}
            </Typography>

            <Typography tag="p" styling="sm" weight="thin">
              {t("operating")} -{" "}
              <b>{entityT(`operating.${offer.operating}`)}</b>
            </Typography>
          </CardHeader>

          <CardBody>
            <Button color="primary">{t("apply")}</Button>
          </CardBody>

          <CardFooter className={styles.footer}>
            <Typography tag="p" styling="sm" weight="thin">
              <Icon name="HiCalendar" className={styles.icon} />
              {t("publication.label")}
              <b>{published}</b>
            </Typography>
          </CardFooter>
        </Card>
      }
    />
  );
};
