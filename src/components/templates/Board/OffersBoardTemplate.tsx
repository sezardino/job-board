import { NoDataCard } from "@/components/UI/NoDataCard/NoDataCard";
import { OffersList } from "@/components/UI/OffersList/OffersList";
import { PublicPageUrls } from "@/const";
import { OffersListResponse } from "@/services/bll/modules/job-offers/schema";
import { DataProp } from "@/types";
import { useTranslations } from "next-intl";
import { type ComponentPropsWithoutRef, type FC } from "react";
import { twMerge } from "tailwind-merge";

type Props = {
  offers: DataProp<OffersListResponse>;
  onTriggerFetchNextPage: () => void;
  hasNextPage: boolean;
};

export type OffersBoardTemplateProps = ComponentPropsWithoutRef<"div"> & Props;

export const OffersBoardTemplate: FC<OffersBoardTemplateProps> = (props) => {
  const { offers, hasNextPage, onTriggerFetchNextPage, className, ...rest } =
    props;

  const t = useTranslations("page.landing.job-offers-board");

  return (
    <section {...rest} className={twMerge("pb-4", className)}>
      {!offers.isLoading && offers.data?.meta.count === 0 && (
        <NoDataCard
          title={t("no-data.title")}
          description={t("no-data.description")}
        />
      )}

      <OffersList
        isLoading={offers.isLoading}
        offers={offers.data?.data || []}
        linkPrefix={PublicPageUrls.offer("")}
        endContent={
          hasNextPage
            ? [{ label: "load more", onClick: onTriggerFetchNextPage }]
            : undefined
        }
      />
    </section>
  );
};
