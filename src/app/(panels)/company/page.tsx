"use client";

import { LoadingOverlay } from "@/components/base";
import { CompanyTemplate } from "@/components/templates/Shared/CompanyTemplate";
import { useMyCompanyQuery } from "@/hooks";
import { useEditCompanyMutation } from "@/hooks/react-query/mutation/companies";

const CompanyHomePage = () => {
  const { data: myCompany, isFetching: isMyCompanyLoading } =
    useMyCompanyQuery();

  const { mutateAsync: editCompany, isPending: isEditLoading } =
    useEditCompanyMutation();

  const isLoading = isMyCompanyLoading;

  return (
    <>
      {isLoading && <LoadingOverlay />}
      <CompanyTemplate
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

export default CompanyHomePage;
