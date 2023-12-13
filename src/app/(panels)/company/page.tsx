"use client";

import { LoadingOverlay } from "@/components/base";
import { CompanyTemplate } from "@/components/templates/Shared/CompanyTemplate";
import { useMyCompanyQuery } from "@/hooks";

const CompanyHomePage = () => {
  const { data: myCompany, isFetching: isMyCompanyLoading } =
    useMyCompanyQuery();

  const isLoading = isMyCompanyLoading;

  return (
    <>
      {isLoading && <LoadingOverlay />}
      <CompanyTemplate isLoading={isMyCompanyLoading} company={myCompany} />
    </>
  );
};

export default CompanyHomePage;
