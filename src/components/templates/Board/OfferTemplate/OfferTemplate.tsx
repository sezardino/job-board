import { DEFAULT_DATE_FORMAT, PublicPageUrls } from "@/const";
import {
  CommonOffersResponse,
  PreviewOfferResponse,
} from "@/services/bll/modules/offers/schema";
import { Card, CardBody, CardFooter, CardHeader } from "@nextui-org/react";
import dayjs from "dayjs";
import { useTranslations } from "next-intl";
import {
  useCallback,
  useMemo,
  useRef,
  useState,
  type ComponentPropsWithoutRef,
  type FC,
} from "react";

import { OffersList } from "@/components/UI/OffersList/OffersList";
import { Button } from "@/components/base/Button/Button";
import { Icon } from "@/components/base/Icon/Icon";
import { Typography } from "@/components/base/Typography/Typography";
import {
  ApplicationForm,
  ApplicationFormValues,
} from "@/components/forms/Application/ApplicationForm";
import { OfferTemplateWrapper } from "@/components/modules/offer/OfferTemplateWrapper/OfferTemplateWrapper";
import { ActionProp, InfiniteDataProp } from "@/types";
import styles from "./OfferTemplate.module.scss";

export type OfferTemplateProps = ComponentPropsWithoutRef<"div"> & {
  offer: PreviewOfferResponse;
  commonOffers: InfiniteDataProp<CommonOffersResponse>;
  applyForOffer: ActionProp<ApplicationFormValues, any>;
};

export const OfferTemplate: FC<OfferTemplateProps> = (props) => {
  const { offer, applyForOffer, commonOffers, className, ...rest } = props;
  const entityT = useTranslations("entity");
  const t = useTranslations("page.shared.offer");
  const [isSuccessShowed, setIsSuccessShowed] = useState(false);
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
      entityT(`job-offer.operating.${operating}`)
    );

    return arr.join(", ");
  }, [entityT, offer.operating]);

  const breadcrumbs = useMemo(
    () => [
      { href: PublicPageUrls.home, label: t("home") },
      {
        href: PublicPageUrls.offersByIndustry(offer.industry.name),
        label: entityT(`industries.${offer.industry.name}`),
      },

      {
        href: PublicPageUrls.offersByCategory(
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
    async (values: ApplicationFormValues) => {
      try {
        applyForOffer.handler(values);
        setIsSuccessShowed(true);
      } catch (error) {}
    },
    [applyForOffer]
  );

  return (
    <OfferTemplateWrapper
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
        operating: offer.operating,
      }}
      skills={offer.skills}
      aside={
        <Card as="section" className={styles.aside}>
          <CardHeader className={styles.header}>
            {!!offer.salaryFrom && !!offer.salaryTo && (
              <Typography tag="p" styling="lg" weight="bold">
                {offer.salaryFrom}-{offer.salaryTo}
              </Typography>
            )}

            <Typography tag="p" styling="sm" weight="thin">
              {t("operating")} - <b>{translatedOperating}</b>
            </Typography>
          </CardHeader>

          <CardBody>
            <Button
              color="primary"
              onClick={() =>
                formSectionRef.current?.scrollIntoView({ behavior: "smooth" })
              }
              text={t("apply")}
            />
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
      <div ref={formSectionRef} className={styles.form}>
        <Card as="section">
          <CardHeader>
            <Typography tag="h2" styling="lg">
              {t("form")}
            </Typography>
          </CardHeader>
          <CardBody>
            <ApplicationForm onFormSubmit={applyHandler} />
          </CardBody>
        </Card>
        {isSuccessShowed && (
          <div className={styles.success}>
            <Icon name="HiCheck" size={40} className={styles.successIcon} />
            <Typography tag="h2" styling="md">
              {t("success.title")}
            </Typography>
            <Typography tag="p" styling="sm" color="default-500">
              {t("success.description")}
            </Typography>
          </div>
        )}
      </div>

      {/* TODO: check if exist */}
      {commonOffers.data && commonOffers.data.meta.count > 0 && (
        <Card>
          <CardHeader>
            <Typography tag="h2" styling="lg">
              {t("similar")}
            </Typography>
          </CardHeader>
          <CardBody>
            <OffersList
              offers={commonOffers.data.data}
              linkPrefix={PublicPageUrls.offer("")}
              isFetching={commonOffers.isFetching}
              isFetchingNextPage={commonOffers.isFetchingNextPage}
              fetchNextPage={commonOffers.fetchNextPage}
              hasNextPage={!!commonOffers.hasNextPage}
            />
          </CardBody>
        </Card>
      )}
    </OfferTemplateWrapper>
  );
};
