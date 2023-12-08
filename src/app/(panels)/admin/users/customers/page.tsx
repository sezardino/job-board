"use client";

import { ManageCustomersTemplate } from "@/components/templates/ManageCustomersTemplate";
import { useCustomersUsersQuery } from "@/hooks/react-query/query/users";
import { useTableOnPage } from "@/hooks/use-table-on-page";

const CustomersPage = () => {
  const { limit, onLimitChange, onPageChange, onSearchChange, page, search } =
    useTableOnPage();
  const { data: customers, isFetching: isCustomersLoading } =
    useCustomersUsersQuery({
      limit,
      page,
      search,
    });

  return (
    <ManageCustomersTemplate
      data={customers}
      isTableDataLoading={isCustomersLoading}
      onLimitChange={onLimitChange}
      onPageChange={onPageChange}
      onSearchChange={onSearchChange}
    />
  );
};

export default CustomersPage;
