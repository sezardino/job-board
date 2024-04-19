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
import { ActionProp, InfiniteDataProp, QueryProps } from "@/types";
import styles from "./OfferTemplate.module.scss";

export type OfferTemplateProps = ComponentPropsWithoutRef<"div"> & {
  offer: QueryProps<PreviewOfferResponse>;
  commonOffers: InfiniteDataProp<CommonOffersResponse>;
  applyForOffer: ActionProp<ApplicationFormValues, any>;
  isReadOnly: boolean;
};

export const OfferTemplate: FC<OfferTemplateProps> = (props) => {
  const { offer, applyForOffer, commonOffers, isReadOnly, className, ...rest } =
    props;
  const entityT = useTranslations("entity");
  const t = useTranslations("page.shared.offer");
  const [isSuccessShowed, setIsSuccessShowed] = useState(false);
  const formSectionRef = useRef<HTMLDivElement>(null);

  const published = useMemo(() => {
    const days = dayjs(offer.data?.publishedAt).diff(dayjs(), "day");

    if (days === 0) {
      return t("publication.today");
    }

    if (days === 1) {
      return t("publication.yesterday");
    }

    if (days > 1 && days < 7) {
      return t("publication.days-ago", { value: days });
    }

    return dayjs(offer.data?.publishedAt).format(DEFAULT_DATE_FORMAT);
  }, [offer.data?.publishedAt, t]);

  const translatedOperating = useMemo(() => {
    const arr =
      offer.data?.operating.map((operating) =>
        entityT(`offers.operating.${operating}`)
      ) || [];

    return arr.join(", ");
  }, [entityT, offer.data?.operating]);

  const breadcrumbs = useMemo(() => {
    if (!offer.data) return [];

    return [
      { href: PublicPageUrls.home, label: t("home") },
      {
        href: PublicPageUrls.offersByIndustry(offer.data?.industry.name),
        label: entityT(`industries.${offer.data?.industry.name}`),
      },
      {
        href: PublicPageUrls.offersByCategory(
          offer.data?.industry.name,
          offer.data?.category.name
        ),
        label: entityT(`categories.${offer.data?.category.name}`),
      },

      { label: offer.data?.company.name },
    ];
  }, [entityT, offer.data, t]);

  const applyHandler = useCallback(
    async (values: ApplicationFormValues) => {
      try {
        applyForOffer?.handler(values);
        setIsSuccessShowed(true);
      } catch (error) {}
    },
    [applyForOffer]
  );

  const companyData = {
    id: offer.data?.company.id,
    name: offer.data?.company.name,
    logo: { url: offer.data?.company.logo?.url || "" },
  };

  const offerData = {
    name: offer.data?.name,
    description: offer.data?.description || "",
    contract: offer.data?.contract,
    seniority: offer.data?.seniority,
    type: offer.data?.type,
    operating: offer.data?.operating,
  };

  return (
    <OfferTemplateWrapper
      {...rest}
      breadcrumbs={breadcrumbs}
      company={companyData}
      offer={offerData}
      skills={offer.data?.skills || []}
      aside={
        <Card as="section" className={styles.aside}>
          <CardHeader className={styles.header}>
            {!!offer.data?.salaryFrom && !!offer.data?.salaryTo && (
              <Typography tag="p" styling="lg" weight="bold">
                {offer.data?.salaryFrom}-{offer.data?.salaryTo}
              </Typography>
            )}

            <Typography tag="p" styling="sm" weight="thin">
              {t("operating")} - <b>{translatedOperating}</b>
            </Typography>
          </CardHeader>

          {!isReadOnly && (
            <CardBody>
              <Button
                color="primary"
                variant={offer.data?.isAlreadyApplied ? "ghost" : undefined}
                onClick={() =>
                  formSectionRef.current?.scrollIntoView({ behavior: "smooth" })
                }
                text={
                  offer.data?.isAlreadyApplied
                    ? t("apply.again")
                    : t("apply.now")
                }
              />
            </CardBody>
          )}

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
            <ApplicationForm
              isDisabled={isReadOnly}
              onFormSubmit={applyHandler}
            />
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

      <Card as="section">
        <CardHeader>
          <Typography tag="h2" styling="lg">
            {t("similar.title")}
          </Typography>
        </CardHeader>
        <CardBody>
          {commonOffers.data?.meta.count === 0 && (
            <Typography tag="h2" styling="lg">
              {t("similar.empty")}
            </Typography>
          )}

          {!!commonOffers.data?.meta.count && (
            <OffersList
              offers={commonOffers.data?.data || []}
              linkPrefix={PublicPageUrls.offer("")}
              isFetching={commonOffers.isFetching}
              isFetchingNextPage={commonOffers.isFetchingNextPage}
              fetchNextPage={commonOffers.fetchNextPage}
              hasNextPage={!!commonOffers.hasNextPage}
            />
          )}
        </CardBody>
      </Card>
    </OfferTemplateWrapper>
  );
};
