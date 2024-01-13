import { OffersList } from "@/components/UI/OffersList/OffersList";
import { PublicPageUrls } from "@/const";
import { OffersListResponse } from "@/services/server/modules/job-offers/scema";
import { type ComponentPropsWithoutRef, type FC } from "react";
import { twMerge } from "tailwind-merge";

type Props = {
  offersList?: OffersListResponse;
  onTriggerFetchNextPage: () => void;
  hasNextPage: boolean;
};

export type OffersBoardTemplateProps = ComponentPropsWithoutRef<"div"> & Props;

export const OffersBoardTemplate: FC<OffersBoardTemplateProps> = (props) => {
  const {
    offersList,
    hasNextPage,
    onTriggerFetchNextPage,
    className,
    ...rest
  } = props;

  return (
    <div {...rest} className={twMerge("pb-4", className)}>
      <OffersList
        offers={offersList?.data || []}
        linkPrefix={PublicPageUrls.offers}
        endContent={
          hasNextPage
            ? [{ label: "load more", onClick: onTriggerFetchNextPage }]
            : undefined
        }
      />
    </div>
  );
};
