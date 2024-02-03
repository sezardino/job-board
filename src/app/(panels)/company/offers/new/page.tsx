"use client";

import { NewOfferTemplate } from "@/components/templates/Company/NewOffer";
import { useActiveCategoriesQuery } from "@/hooks/react-query/query/categories/active-categories";
import { useActiveIndustriesQuery } from "@/hooks/react-query/query/industries/active-industries";
import { useState } from "react";

const NewOfferPage = () => {
  const { data: activeIndustries, isFetching: isActiveIndustriesLoading } =
    useActiveIndustriesQuery();

  const [selectedIndustry, setSelectedIndustry] = useState<string>("");

  const { data: activeCategories, isFetching: isActiveCategoriesLoading } =
    useActiveCategoriesQuery(selectedIndustry);

  return (
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
    />
  );
};

export default NewOfferPage;
