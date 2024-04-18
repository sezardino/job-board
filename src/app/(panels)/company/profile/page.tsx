"use client";

import { LoadingOverlay } from "@/components/base/LoadingOverlay/LoadingOverlay";
import { CompanyProfileTemplate } from "@/components/templates/Shared/CompanyProfileTemplate";
import { CompanyPageUrls } from "@/const";
import { useCompanyProfileQuery } from "@/hooks";
import { useEditMyCompanyMutation } from "@/hooks/react-query/mutation/companies";

const CompanyProfilePage = () => {
  const { data: myCompany, isFetching: isMyCompanyLoading } =
    useCompanyProfileQuery({});

  const { mutateAsync: editCompany, isPending: isEditLoading } =
    useEditMyCompanyMutation();

  const isLoading = isMyCompanyLoading;

  return (
    <>
      {isLoading && <LoadingOverlay />}
      <CompanyProfileTemplate
        offerLinkPrefix={CompanyPageUrls.offers}
        isLoading={isMyCompanyLoading}
        withManage
        company={myCompany}
        editAction={{
          handler: editCompany,
          isLoading: isEditLoading,
        }}
      />
    </>
  );
};

export default CompanyProfilePage;
