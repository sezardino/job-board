"use client";

import { HomeTemplate } from "@/components/templates/Board/HomeTemplate";
import { useActiveIndustriesQuery } from "@/hooks/react-query/query/industries/active-industries";

const HomePage = () => {
  const { data: activeIndustries, isLoading: isActiveIndustriesLoading } =
    useActiveIndustriesQuery();

  const isLoading = isActiveIndustriesLoading;

  return <HomeTemplate industries={activeIndustries?.industries || []} />;
};

export default HomePage;
