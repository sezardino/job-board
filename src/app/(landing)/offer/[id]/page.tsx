"use client";

import { ApplicationFormValues } from "@/components/forms/Application/ApplicationForm";
import { OfferTemplate } from "@/components/templates/Board/OfferTemplate/OfferTemplate";
import { useApplyForOfferMutation } from "@/hooks";
import { usePreviewOfferQuery } from "@/hooks/react-query/query/offers";
import { useCommonOffersInfiniteQuery } from "@/hooks/react-query/query/offers/common-offers";
import { useSession } from "next-auth/react";
import { useCallback } from "react";

type Props = {
  params: {
    id: string;
  };
};

const OfferPage = (props: Props) => {
  const { id } = props.params;
  const { data: session } = useSession();

  const offerPreviewQuery = usePreviewOfferQuery({ id });

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

  if (!offerPreviewQuery.data) return null;

  return (
    <OfferTemplate
      isReadOnly
      // isReadOnly={!session?.user || session.user.role !== UserRoles.CUSTOMER}
      offer={offerPreviewQuery}
      commonOffers={commonOffersQuery}
      applyForOffer={{
        handler: applyForOfferHandler,
        isLoading: isApplyForOfferLoading,
      }}
    />
  );
};

export default OfferPage;
