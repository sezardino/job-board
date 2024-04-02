import { JobOfferTemplateWrapper } from "@/components/modules/job-offer/JobOfferTemplateWrapper/JobOfferTemplateWrapper";
import { DEFAULT_DATE_FORMAT, PublicPageUrls } from "@/const";
import { PreviewJobOfferResponse } from "@/services/bll/modules/job-offers/schema";
import { Card, CardBody, CardFooter, CardHeader } from "@nextui-org/react";
import dayjs from "dayjs";
import { useTranslations } from "next-intl";
import {
  useCallback,
  useMemo,
  useRef,
  type ComponentPropsWithoutRef,
  type FC,
} from "react";

import { Button } from "@/components/base/Button/Button";
import { Icon } from "@/components/base/Icon/Icon";
import { Typography } from "@/components/base/Typography/Typography";
import {
  JobApplicationForm,
  JobApplicationFormValues,
} from "@/components/forms/JobApplication/JobApplicationForm";
import { ActionProp } from "@/types";
import styles from "./JobOfferTemplate.module.scss";

export type JobOfferTemplateProps = ComponentPropsWithoutRef<"div"> & {
  offer: PreviewJobOfferResponse;
  applyForJobOffer: ActionProp<JobApplicationFormValues, any>;
};

export const JobOfferTemplate: FC<JobOfferTemplateProps> = (props) => {
  const { offer, applyForJobOffer, className, ...rest } = props;
  const entityT = useTranslations("entity");
  const t = useTranslations("page.landing.job-offer");
  const formSectionRef = useRef<HTMLDivElement>(null);

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

  const translatedOperating = useMemo(() => {
    const arr = offer.operating.map((operating) =>
      entityT(`operating.${operating}`)
    );

    return arr.join(", ");
  }, [entityT, offer.operating]);

  const breadcrumbs = useMemo(
    () => [
      { href: PublicPageUrls.home, label: t("home") },
      {
        href: PublicPageUrls.jobOffersByIndustry(offer.industry.name),
        label: entityT(`industries.${offer.industry.name}`),
      },

      {
        href: PublicPageUrls.jobOffersByCategory(
          offer.industry.name,
          offer.category.name
        ),
        label: entityT(`categories.${offer.category.name}`),
      },

      { label: offer.company.name },
    ],
    [entityT, offer.category.name, offer.company.name, offer.industry.name, t]
  );

  const applyHandler = useCallback(
    async (values: JobApplicationFormValues) => {
      try {
        applyForJobOffer.handler(values);
        // TODO: show success message
      } catch (error) {}
    },
    [applyForJobOffer]
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
      offer={{
        name: offer.name,
        description: offer.description || "",
        contract: offer.contract,
        seniority: offer.seniority,
        type: offer.type,
      }}
      skills={offer.skills}
      aside={
        <Card as="section" className={styles.aside}>
          <CardHeader className={styles.header}>
            <Typography tag="p" styling="lg" weight="bold">
              {offer.salary?.from}-{offer.salary?.to}
            </Typography>

            <Typography tag="p" styling="sm" weight="thin">
              {t("operating")} - <b>{translatedOperating}</b>
            </Typography>
          </CardHeader>

          <CardBody>
            <Button
              color="primary"
              onClick={() => formSectionRef.current?.scrollIntoView()}
            >
              {t("apply")}
            </Button>
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
    >
      <Card ref={formSectionRef} as="section" className={styles.description}>
        <CardHeader>
          <Typography tag="h2" styling="lg">
            {t("form")}
          </Typography>
        </CardHeader>
        <CardBody>
          <JobApplicationForm onFormSubmit={applyHandler} />
        </CardBody>
      </Card>

      {/* TODO: check if exist */}
      <Card>
        <CardHeader>
          <Typography tag="h2" styling="lg">
            {t("similar")}
          </Typography>
        </CardHeader>
        <CardBody>similar job offers here</CardBody>
      </Card>
    </JobOfferTemplateWrapper>
  );
};
