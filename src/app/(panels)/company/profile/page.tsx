"use client";

import { LoadingOverlay } from "@/components/base";
import { CompanyProfileTemplate } from "@/components/templates/Shared/CompanyProfileTemplate";
import { useMyCompanyProfileQuery } from "@/hooks";
import { useEditMyCompanyMutation } from "@/hooks/react-query/mutation/companies";

const CompanyProfilePage = () => {
  const { data: myCompany, isFetching: isMyCompanyLoading } =
    useMyCompanyProfileQuery();

  const { mutateAsync: editCompany, isPending: isEditLoading } =
    useEditMyCompanyMutation();

  const isLoading = isMyCompanyLoading;

  return (
    <>
      {isLoading && <LoadingOverlay />}
      <CompanyProfileTemplate
        offerLinkPrefix="#"
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
