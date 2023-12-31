import { OffersList } from "@/components/UI/OffersList/OffersList";
import { OffersListResponse } from "@/services/server/modules/job-offers/scema";
import { type ComponentPropsWithoutRef, type FC } from "react";

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
    <div {...rest}>
      <OffersList
        offers={offersList?.data || []}
        linkPrefix={""}
        endContent={
          hasNextPage
            ? [{ label: "load more", onClick: onTriggerFetchNextPage }]
            : undefined
        }
      />
    </div>
  );
};
