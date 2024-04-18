"use client";

import { LoadingOverlay } from "@/components/base/LoadingOverlay/LoadingOverlay";
import { CompanyProfileTemplate } from "@/components/templates/Shared/CompanyProfileTemplate";
import { PublicPageUrls } from "@/const";
import { useCompanyProfileQuery } from "@/hooks";

const CompanyProfilePage = () => {
  const { data: myCompany, isFetching: isMyCompanyLoading } =
    useCompanyProfileQuery({});

  const isLoading = isMyCompanyLoading;

  return (
    <>
      {isLoading && <LoadingOverlay />}
      <CompanyProfileTemplate
        offerLinkPrefix={PublicPageUrls.offer("")}
        isLoading={isMyCompanyLoading}
        company={myCompany}
      />
    </>
  );
};

export default CompanyProfilePage;
