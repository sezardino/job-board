"use client";

import { UserStatusesSelectOptions } from "@/components/UI/UserStatusesSelect/UserStatusesSelect";
import { ManageCompanyUsers } from "@/components/templates/Company/ManageCompanyUsers";
import { useCheckEmailsAvailableMutation, useTableOnPage } from "@/hooks";
import { useCancelInviteMutation } from "@/hooks/react-query/mutation/users/cancel-invite";
import { useEditCompanyUserMutation } from "@/hooks/react-query/mutation/users/edit-company-user";
import { useInviteUsersMutation } from "@/hooks/react-query/mutation/users/invite-users";
import { useCompanyUsersQuery } from "@/hooks/react-query/query/users/company";
import { useState } from "react";

const CompanyUsersPage = () => {
  const { onLimitChange, onPageChange, page, limit, search, onSearchChange } =
    useTableOnPage();
  const [status, setStatus] = useState<UserStatusesSelectOptions>("all");
  const { data: companyUsers, isFetching: isCompanyUsersLoading } =
    useCompanyUsersQuery({
      page,
      limit,
      search,
      status: status === "all" ? undefined : status,
    });

  const { mutateAsync: checkEmails, isPending: isCheckEmailsLoading } =
    useCheckEmailsAvailableMutation();

  const { mutateAsync: inviteUsers, isPending: isInviteUsersLoading } =
    useInviteUsersMutation();

  const { mutateAsync: cancelInvite, isPending: isCancelLoading } =
    useCancelInviteMutation();

  const { mutateAsync: resendInvite, isPending: isResendLoading } =
    useCancelInviteMutation();

  const { mutateAsync: editUser, isPending: isEditUserLoading } =
    useEditCompanyUserMutation();

  return (
    <ManageCompanyUsers
      onLimitChange={onLimitChange}
      onPageChange={onPageChange}
      onSearchChange={onSearchChange}
      onStatusChange={setStatus}
      status={status}
      users={{ data: companyUsers, isLoading: isCompanyUsersLoading }}
      checkEmailAction={{
        handler: checkEmails,
        isLoading: isCheckEmailsLoading,
      }}
      inviteUsersAction={{
        handler: inviteUsers,
        isLoading: isInviteUsersLoading,
      }}
      resendInviteAction={{
        handler: resendInvite,
        isLoading: isResendLoading,
      }}
      cancelInviteAction={{
        handler: cancelInvite,
        isLoading: isCancelLoading,
      }}
      editUserAction={{
        handler: editUser,
        isLoading: isEditUserLoading,
      }}
    />
  );
};

export default CompanyUsersPage;
