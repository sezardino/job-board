"use client";

import { LoadingOverlay } from "@/components/base";
import {
  NewOfferData,
  NewOfferTemplate,
} from "@/components/templates/Company/NewOffer/NewOfferTemplate";
import { CompanyPageUrls } from "@/const";
import { useCreateJobOfferMutation } from "@/hooks/react-query/mutation/offers";
import { useActiveCategoriesQuery } from "@/hooks/react-query/query/categories/active-categories";
import { useActiveIndustriesQuery } from "@/hooks/react-query/query/industries/active-industries";
import { useRouter } from "next/navigation";
import { useCallback, useState } from "react";

const NewOfferPage = () => {
  const router = useRouter();

  const { data: activeIndustries, isFetching: isActiveIndustriesLoading } =
    useActiveIndustriesQuery();

  const [selectedIndustry, setSelectedIndustry] = useState<string>("");

  const { data: activeCategories, isFetching: isActiveCategoriesLoading } =
    useActiveCategoriesQuery(selectedIndustry);

  const { mutateAsync: createJobOffer, isPending: isCreateJobOfferLoading } =
    useCreateJobOfferMutation();

  const handleCreateOfferRequest = useCallback(
    (values: Required<NewOfferData>) =>
      createJobOffer(
        {
          ...values.description,
          ...values.details,
          ...values.skills,
          ...values.specification,
        },
        { onSuccess: () => router.push(CompanyPageUrls.offers) }
      ),
    [createJobOffer, router]
  );

  return (
    <>
      {isCreateJobOfferLoading && <LoadingOverlay />}
      <NewOfferTemplate
        categories={{
          data: activeCategories,
          isLoading: isActiveCategoriesLoading,
        }}
        industries={{
          data: activeIndustries,
          isLoading: isActiveIndustriesLoading,
        }}
        onSelectIndustry={setSelectedIndustry}
        onCreateOfferRequest={{
          handler: handleCreateOfferRequest,
          isLoading: isCreateJobOfferLoading,
        }}
      />
    </>
  );
};

export default NewOfferPage;
