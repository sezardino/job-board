"use client";

import { ApplicationFormValues } from "@/components/forms/Application/ApplicationForm";
import { OfferTemplate } from "@/components/templates/Board/OfferTemplate/OfferTemplate";
import { useApplyForOfferMutation } from "@/hooks";
import { usePreviewOfferQuery } from "@/hooks/react-query/query/offers";
import { useCommonOffersInfiniteQuery } from "@/hooks/react-query/query/offers/common-offers";
import { useCallback } from "react";

type Props = {
  params: {
    id: string;
  };
};

const OfferPage = (props: Props) => {
  const { id } = props.params;

  const {
    data: oneOffer,
    isFetching: isOneOfferLoading,
    error,
  } = usePreviewOfferQuery({ id });

  const commonOffersQuery = useCommonOffersInfiniteQuery({ id });

  const { mutateAsync: applyForOffer, isPending: isApplyForOfferLoading } =
    useApplyForOfferMutation();

  const applyForOfferHandler = useCallback(
    async ({ file, ...values }: ApplicationFormValues) => {
      return applyForOffer({
        offerId: id,
        curriculumVitae: file,
        ...values,
      });
    },
    [applyForOffer, id]
  );

  if (!oneOffer) return null;

  return (
    <OfferTemplate
      offer={oneOffer}
      commonOffers={commonOffersQuery}
      applyForOffer={{
        handler: applyForOfferHandler,
        isLoading: isApplyForOfferLoading,
      }}
    />
  );
};

export default OfferPage;
