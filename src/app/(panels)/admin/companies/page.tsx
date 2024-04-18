"use client";

import { ManageCompaniesTemplate } from "@/components/templates/Admin/ManageCompanies/ManageCompaniesTemplate";
import { useAdminCompaniesListQuery } from "@/hooks/react-query/query/companies";
import { useDataOnPage } from "@/hooks/use-data-on-page";

const CompaniesPage = () => {
  const { limit, onLimitChange, onPageChange, onSearchChange, page, search } =
    useDataOnPage();
  const companiesQuery = useAdminCompaniesListQuery({ limit, page, search });

  return (
    <ManageCompaniesTemplate
      companies={companiesQuery}
      onLimitChange={onLimitChange}
      onPageChange={onPageChange}
      onSearchChange={onSearchChange}
    />
  );
};

export default CompaniesPage;
