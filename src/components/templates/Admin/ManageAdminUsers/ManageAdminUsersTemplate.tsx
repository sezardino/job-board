import { Button } from "@/components/base/Button/Button";
import { LoadingOverlay } from "@/components/base/LoadingOverlay/LoadingOverlay";
import { ModalWithDescription } from "@/components/base/ModalWithDescription/ModalWithDescription";
import { AdminUsersResponse } from "@/services/bll/modules/users/schema";
import { useTranslations } from "next-intl";
import {
  useCallback,
  useState,
  type ComponentPropsWithoutRef,
  type FC,
} from "react";
import { SearchForm } from "../../../base/SearchForm/SearchForm";
import { AuthForm, AuthFormValues } from "../../../forms";

import { AdminsTable } from "@/components/modules/admin/AdminsTable";
import styles from "./ManageAdminUsersTemplate.module.scss";

type Props = {
  data?: AdminUsersResponse;
  isTableDataLoading: boolean;
  onLimitChange: (limit: number) => void;
  onPageChange: (page: number) => void;
  onInviteAdminFormSubmit: (data: AuthFormValues) => Promise<any>;
  onEmailAvailableRequest: (email: string) => Promise<boolean>;
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
    onInviteAdminFormSubmit,
    onEmailAvailableRequest,
    onSearchChange,
    className,
    ...rest
  } = props;
  const t = useTranslations("page.admin.manage-admins");

  const [isInviteAdminModalOpen, setIsInviteAdminModalOpen] = useState(false);

  const inviteAdminHandler = useCallback(
    async (values: AuthFormValues) => {
      try {
        await onInviteAdminFormSubmit(values);
        setIsInviteAdminModalOpen(false);
      } catch (error) {}
    },
    [onInviteAdminFormSubmit]
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
          <AuthForm
            type="new-user"
            onFormSubmit={inviteAdminHandler}
            onEmailAvailableRequest={onEmailAvailableRequest}
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
