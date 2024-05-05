"use client";

import { InviteUsersFormValues } from "@/components/forms/InviteUsers/InviteUsers";
import { ManageAdminUsersTemplate } from "@/components/templates/Admin/ManageAdminUsers/ManageAdminUsersTemplate";
import { useAdminUsersQuery } from "@/hooks/react-query";
import {
  useCheckEmailAvailableMutation,
  useInviteUsersMutation,
} from "@/hooks/react-query/mutation/";
import { useDataOnPage } from "@/hooks/use-data-on-page";
import { UserRoles } from "@prisma/client";
import { useCallback } from "react";

const AdminsPage = () => {
  const { limit, onLimitChange, onPageChange, onSearchChange, page, search } =
    useDataOnPage();
  const { data: admins, isFetching: isAdminsLoading } = useAdminUsersQuery({
    limit,
    page,
    search,
  });

  const { mutateAsync: inviteAdmin, isPending: isInviteAdminLoading } =
    useInviteUsersMutation();

  const { mutateAsync: checkEmails, isPending: isCheckEmailsLoading } =
    useCheckEmailAvailableMutation();

  const inviteUsersHandler = useCallback(
    async (values: InviteUsersFormValues) => {
      const mapperUsers = values.users.map((user) => ({
        email: user.email,
        role: UserRoles.SUB_ADMIN,
      }));

      return inviteAdmin({ users: mapperUsers });
    },
    [inviteAdmin]
  );

  return (
    <ManageAdminUsersTemplate
      data={admins}
      isInviteAdminLoading={isInviteAdminLoading}
      isTableDataLoading={isAdminsLoading}
      onLimitChange={onLimitChange}
      onPageChange={onPageChange}
      inviteUsersAction={{
        handler: inviteUsersHandler,
        isLoading: isInviteAdminLoading,
      }}
      checkEmailAction={{
        handler: checkEmails,
        isLoading: isCheckEmailsLoading,
      }}
      onSearchChange={onSearchChange}
    />
  );
};

export default AdminsPage;
