"use client";

import { useAdminUsersQuery } from "@/hooks/react-query/query/users";
import { useTableOnPage } from "@/hooks/use-table-on-page";

const CustomersPage = () => {
  const { limit, onLimitChange, onPageChange, onSearchChange, page, search } =
    useTableOnPage();
  const { data: admins, isFetching: isAdminsLoading } = useAdminUsersQuery({
    limit,
    page,
    search,
  });

  return <p>{JSON.stringify(admins?.users)}</p>;
};

export default CustomersPage;
