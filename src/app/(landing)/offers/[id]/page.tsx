"use client";

import { JobApplicationFormValues } from "@/components/forms/JobApplication/JobApplicationForm";
import { JobOfferTemplate } from "@/components/templates/Board/JobOfferTemplate/JobOfferTemplate";
import { useApplyForJobOfferMutation } from "@/hooks";
import { usePreviewJobOfferQuery } from "@/hooks/react-query/query/job-offers";
import { useCommonJobOffersInfiniteQuery } from "@/hooks/react-query/query/job-offers/common-job-offers";
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
  } = usePreviewJobOfferQuery({ id });

  const commonJobOffersQuery = useCommonJobOffersInfiniteQuery({ id });

  const {
    mutateAsync: applyForJobOffer,
    isPending: isApplyForJobOfferLoading,
  } = useApplyForJobOfferMutation();

  const applyForJobOfferHandler = useCallback(
    async ({ file, ...values }: JobApplicationFormValues) => {
      return applyForJobOffer({
        jobOfferId: id,
        curriculumVitae: file,
        ...values,
      });
    },
    [applyForJobOffer, id]
  );

  if (!oneOffer) return null;

  return (
    <JobOfferTemplate
      offer={oneOffer}
      commonJobOffers={commonJobOffersQuery}
      applyForJobOffer={{
        handler: applyForJobOfferHandler,
        isLoading: isApplyForJobOfferLoading,
      }}
    />
  );
};

export default OfferPage;
