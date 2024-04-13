"use client";

import { ManageCustomersTemplate } from "@/components/templates/Admin/ManageCustomers/ManageCustomersTemplate";
import { useCustomersUsersQuery } from "@/hooks/react-query/query/users";
import { useDataOnPage } from "@/hooks/use-data-on-page";

const CustomersPage = () => {
  const { limit, onLimitChange, onPageChange, onSearchChange, page, search } =
    useDataOnPage();
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
