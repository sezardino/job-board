"use client";

import { ManageCompanyUsers } from "@/components/templates/ManageCompanyUsersTemplate";
import { useCompanyUsersQuery } from "@/hooks/react-query/query/users/companies";
import { useTableOnPage } from "@/hooks/use-table-on-page";

const AdminsPage = () => {
  const { limit, onLimitChange, onPageChange, onSearchChange, page, search } =
    useTableOnPage();
  const { data: companyUsers, isFetching: isCompanyUsersLoading } =
    useCompanyUsersQuery({
      limit,
      page,
      search,
    });

  return (
    <ManageCompanyUsers
      data={companyUsers}
      isTableDataLoading={isCompanyUsersLoading}
      onLimitChange={onLimitChange}
      onPageChange={onPageChange}
      onSearchChange={onSearchChange}
    />
  );
};

export default AdminsPage;
