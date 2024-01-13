"use client";

import { LoadingOverlay } from "@/components/base";
import { HomeTemplate } from "@/components/templates/Board/HomeTemplate";
import { useActiveIndustriesQuery } from "@/hooks/react-query/query/industries/active-industries";

const HomePage = () => {
  const { data: activeIndustries, isLoading: isActiveIndustriesLoading } =
    useActiveIndustriesQuery();

  const isLoading = isActiveIndustriesLoading;

  return (
    <>
      {isLoading && <LoadingOverlay />}

      <HomeTemplate industries={activeIndustries?.data || []} />
    </>
  );
};

export default HomePage;
