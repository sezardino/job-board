import { Button, Icon, Typography } from "@/components/base";
import { DEFAULT_DATE_FORMAT } from "@/const";
import { PreviewJobOfferResponse } from "@/services/bll/modules/job-offers/schema";
import { Card, CardBody, CardFooter, CardHeader } from "@nextui-org/react";
import dayjs from "dayjs";
import { useTranslations } from "next-intl";
import { useMemo, type ComponentPropsWithoutRef, type FC } from "react";

import { JobOfferTemplateWrapper } from "@/components/modules/job-offer/JobOfferTemplateWrapper/JobOfferTemplateWrapper";

export type ManageJobOfferTemplateProps = ComponentPropsWithoutRef<"div"> & {
  offer: PreviewJobOfferResponse;
};

export const ManageJobOfferTemplate: FC<ManageJobOfferTemplateProps> = (
  props
) => {
  const { offer, className, ...rest } = props;
  const entityT = useTranslations("entity");
  const t = useTranslations("components.job-offer-template");

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
      {
        label: t("deadline"),
        value: dayjs(offer.deadlineAt).format(DEFAULT_DATE_FORMAT),
      },
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

  return (
    <JobOfferTemplateWrapper
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
        <Card
          as="section"
          className="z-10 fixed bottom-0 left-0 right-0 md:sticky md:top-20 text-center"
        >
          <CardHeader className="grid grid-cols-1 gap-1">
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

          <CardFooter className="text-center justify-center">
            <Typography tag="p" styling="sm" weight="thin">
              <Icon name="HiCalendar" className="inline align-bottom" />
              {t("publication.label")}
              <b>{published}</b>
            </Typography>
            {/* form where user can give feedback about job offer */}
          </CardFooter>
        </Card>
      }
    />
  );
};
