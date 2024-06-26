"use client";

import { UserStatusesSelectOptions } from "@/components/UI/UserStatusesSelect/UserStatusesSelect";
import { ManageCompanyUsersTemplate } from "@/components/templates/Company/ManageCompanyUsers/ManageCompanyUsersTemplate";
import { useProfileContext } from "@/context";
import {
  useCheckEmailAvailableMutation,
  useDataOnPage,
  useResendInviteMutation,
} from "@/hooks";
import { useCancelInviteMutation } from "@/hooks/react-query/mutation/users/cancel-invite";
import { useEditCompanyUserMutation } from "@/hooks/react-query/mutation/users/edit-company-user";
import { useInviteUsersMutation } from "@/hooks/react-query/mutation/users/invite-users";
import { useCompanyUsersQuery } from "@/hooks/react-query/query/users/company";
import { UserRoles } from "@prisma/client";
import { useState } from "react";

const CompanyUsersPage = () => {
  const { profile } = useProfileContext();
  const { onLimitChange, onPageChange, page, limit, search, onSearchChange } =
    useDataOnPage();
  const [status, setStatus] = useState<UserStatusesSelectOptions>("all");
  const {
    data: companyUsers,
    isFetching: isCompanyUsersLoading,
    error,
  } = useCompanyUsersQuery({
    page,
    limit,
    search,
    status: status === "all" ? undefined : status,
  });

  const { mutateAsync: checkEmails, isPending: isCheckEmailsLoading } =
    useCheckEmailAvailableMutation();

  const { mutateAsync: inviteUsers, isPending: isInviteUsersLoading } =
    useInviteUsersMutation();

  const { mutateAsync: cancelInvite, isPending: isCancelLoading } =
    useCancelInviteMutation();

  const { mutateAsync: resendInvite, isPending: isResendLoading } =
    useResendInviteMutation();

  const { mutateAsync: editUser, isPending: isEditUserLoading } =
    useEditCompanyUserMutation();

  return (
    <ManageCompanyUsersTemplate
      canManage={profile?.role === UserRoles.OWNER}
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
