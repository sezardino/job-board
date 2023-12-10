"use client";

import { UserStatusesSelectOptions } from "@/components/UI/UserStatusesSelect/UserStatusesSelect";
import { ManageCompanyUsers } from "@/components/templates/Company/ManageCompanyUsers";
import { useTableOnPage } from "@/hooks";
import { useCompanyUsersQuery } from "@/hooks/react-query/query/users/company";
import { UserStatus } from "@prisma/client";
import { useState } from "react";

const CompanyUsersPage = () => {
  const { onLimitChange, onPageChange, page, limit, search, onSearchChange } =
    useTableOnPage();
  const [status, setStatus] = useState<UserStatusesSelectOptions>(
    UserStatus.ACTIVE
  );
  const { data: companyUsers, isFetching: isCompanyUsersLoading } =
    useCompanyUsersQuery({
      page,
      limit,
      search,
      status: status === "all" ? undefined : status,
    });

  return (
    <ManageCompanyUsers
      onLimitChange={onLimitChange}
      onPageChange={onPageChange}
      onSearchChange={onSearchChange}
      onStatusChange={setStatus}
      status={status}
      users={{ data: companyUsers, isLoading: isCompanyUsersLoading }}
    />
  );
};

export default CompanyUsersPage;
