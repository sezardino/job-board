"use client";

import { LoadingOverlay } from "@/components/base";
import { CompanyProfileTemplate } from "@/components/templates/Shared/CompanyProfileTemplate";
import { useMyCompanyQuery } from "@/hooks";
import { useEditCompanyMutation } from "@/hooks/react-query/mutation/companies";

const CompanyProfilePage = () => {
  const { data: myCompany, isFetching: isMyCompanyLoading } =
    useMyCompanyQuery();

  const { mutateAsync: editCompany, isPending: isEditLoading } =
    useEditCompanyMutation();

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
