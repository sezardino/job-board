"use client";

import { useTableOnPage } from "@/hooks";
import { useCompanyUsersQuery } from "@/hooks/react-query/query/users/company";

const CompanyUsersPage = () => {
  const { onLimitChange, onPageChange, page, limit, search, onSearchChange } =
    useTableOnPage();
  const { data: companyUsers } = useCompanyUsersQuery({ page, limit, search });

  return <>{JSON.stringify(companyUsers)}</>;
};

export default CompanyUsersPage;
