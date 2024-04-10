import { NoDataCard } from "@/components/UI/NoDataCard/NoDataCard";
import { OffersList } from "@/components/UI/OffersList/OffersList";
import { PublicPageUrls } from "@/const";
import { OffersListResponse } from "@/services/bll/modules/offers/schema";
import { InfiniteDataProp } from "@/types";
import { useTranslations } from "next-intl";
import { type ComponentPropsWithoutRef, type FC } from "react";
import { twMerge } from "tailwind-merge";

import styles from "./OffersTemplate.module.scss";

type Props = {
  offers: InfiniteDataProp<OffersListResponse>;
};

export type OffersTemplateProps = ComponentPropsWithoutRef<"div"> & Props;

export const OffersTemplate: FC<OffersTemplateProps> = (props) => {
  const { offers, className, ...rest } = props;

  const t = useTranslations("page.landing.job-offers-board");

  return (
    <div {...rest} className={twMerge(styles.element, className)}>
      {!offers.isFetching && offers.data?.meta.count === 0 && (
        <NoDataCard
          title={t("no-data.title")}
          description={t("no-data.description")}
        />
      )}

      <OffersList
        offers={offers.data?.data || []}
        linkPrefix={PublicPageUrls.offer("")}
        hasNextPage={!!offers.hasNextPage}
        fetchNextPage={offers.fetchNextPage}
        isFetching={offers.isFetching}
        isFetchingNextPage={offers.isFetchingNextPage}
      />
    </div>
  );
};
