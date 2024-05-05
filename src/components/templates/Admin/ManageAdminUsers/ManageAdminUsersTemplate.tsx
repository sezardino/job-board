import { Button } from "@/components/base/Button/Button";
import { LoadingOverlay } from "@/components/base/LoadingOverlay/LoadingOverlay";
import { ModalWithDescription } from "@/components/base/ModalWithDescription/ModalWithDescription";
import {
  AdminUsersResponse,
  CheckEmailAvailableRequest,
  CheckEmailAvailableResponse,
} from "@/services/bll/modules/users/schema";
import { useTranslations } from "next-intl";
import {
  useCallback,
  useState,
  type ComponentPropsWithoutRef,
  type FC,
} from "react";
import { SearchForm } from "../../../base/SearchForm/SearchForm";

import {
  InviteUsersForm,
  InviteUsersFormValues,
} from "@/components/forms/InviteUsers/InviteUsers";
import { AdminsTable } from "@/components/modules/admin/AdminsTable";
import { ActionProp } from "@/types";
import styles from "./ManageAdminUsersTemplate.module.scss";

type Props = {
  data?: AdminUsersResponse;
  isTableDataLoading: boolean;
  onLimitChange: (limit: number) => void;
  onPageChange: (page: number) => void;
  inviteUsersAction: ActionProp<InviteUsersFormValues>;
  checkEmailAction: ActionProp<
    CheckEmailAvailableRequest,
    CheckEmailAvailableResponse
  >;
  isInviteAdminLoading: boolean;
  onSearchChange: (search: string) => void;
};

export type ManageAdminUsersTemplateProps =
  ComponentPropsWithoutRef<"section"> & Props;

export const ManageAdminUsersTemplate: FC<ManageAdminUsersTemplateProps> = (
  props
) => {
  const {
    data,
    isTableDataLoading,
    onLimitChange,
    onPageChange,
    isInviteAdminLoading,
    inviteUsersAction,
    checkEmailAction,
    onSearchChange,
    className,
    ...rest
  } = props;
  const t = useTranslations("page.admin.manage-admins");

  const [isInviteAdminModalOpen, setIsInviteAdminModalOpen] = useState(false);

  const inviteAdminHandler = useCallback(
    async (values: InviteUsersFormValues) => {
      try {
        await inviteUsersAction.handler(values);
        setIsInviteAdminModalOpen(false);
      } catch (error) {}
    },
    [inviteUsersAction]
  );

  return (
    <>
      <section {...rest} className={className}>
        <header className={styles.header}>
          <SearchForm onSearch={onSearchChange} />
          <Button
            color="primary"
            onClick={() => setIsInviteAdminModalOpen(true)}
            text={t("invite.trigger")}
          />
        </header>
        <AdminsTable
          data={data?.data || []}
          isLoading={isTableDataLoading}
          page={data?.meta.page || 0}
          limit={data?.meta.limit || 10}
          total={data?.meta.totalPages || 0}
          className="mt-4"
          onLimitChange={onLimitChange}
          onPageChange={onPageChange}
        />
      </section>

      <ModalWithDescription
        isOpen={isInviteAdminModalOpen}
        onClose={() => setIsInviteAdminModalOpen(false)}
        title={t("invite.title")}
        description={t("invite.description")}
      >
        <ModalWithDescription.Body>
          {isInviteAdminLoading && <LoadingOverlay isInWrapper />}
          <InviteUsersForm
            onFormSubmit={inviteAdminHandler}
            onValidateEmailsRequest={checkEmailAction.handler}
            label={t("invite.title")}
            submitText={t("invite.submit")}
            cancel={{
              label: t("invite.cancel"),
              onClick: () => setIsInviteAdminModalOpen(false),
            }}
          />
        </ModalWithDescription.Body>
      </ModalWithDescription>
    </>
  );
};
