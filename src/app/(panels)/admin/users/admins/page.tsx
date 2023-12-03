"use client";

import { ManageAdminsTemplate } from "@/components/templates/ManageAdminsTemplate";
import { useInviteAdminMutation } from "@/hooks/react-query";
import { useCheckEmailAvailableMutation } from "@/hooks/react-query/mutation/";
import { useAdminsListQuery } from "@/hooks/react-query/query/users";
import { useTableOnPage } from "@/hooks/use-table-on-page";
import { useCallback } from "react";

const AdminsPage = () => {
  const { limit, onLimitChange, onPageChange, onSearchChange, page, search } =
    useTableOnPage();
  const { data: admins, isFetching: isAdminsLoading } = useAdminsListQuery({
    limit,
    page,
    search,
  });

  const { mutateAsync: inviteAdmin, isPending: isInviteAdminLoading } =
    useInviteAdminMutation();

  const {
    mutateAsync: checkEmailAvailable,
    isPending: checkEmailAvailablePending,
  } = useCheckEmailAvailableMutation();

  const checkEmailAvailableHandler = useCallback(
    async (email: string) => {
      const response = await checkEmailAvailable({ email });

      return response.available;
    },
    [checkEmailAvailable]
  );

  return (
    <ManageAdminsTemplate
      data={admins}
      isInviteAdminLoading={isInviteAdminLoading}
      isTableDataLoading={isAdminsLoading}
      onLimitChange={onLimitChange}
      onPageChange={onPageChange}
      onInviteAdminFormSubmit={inviteAdmin}
      onEmailAvailableRequest={checkEmailAvailableHandler}
    />
  );
};

export default AdminsPage;
