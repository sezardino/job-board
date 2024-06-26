import { ConfirmModal } from "@/components/UI/ConformModal/ConfirmModal";
import { TableWidget } from "@/components/UI/TableWidget/TableWidget";
import { TitleDescription } from "@/components/UI/TitleDescription/TitleDescription";
import {
  UserStatusesSelect,
  UserStatusesSelectOptions,
} from "@/components/UI/UserStatusesSelect/UserStatusesSelect";
import { Button } from "@/components/base/Button/Button";
import { LoadingOverlay } from "@/components/base/LoadingOverlay/LoadingOverlay";
import { ModalWithDescription } from "@/components/base/ModalWithDescription/ModalWithDescription";
import { SearchForm } from "@/components/base/SearchForm/SearchForm";
import {
  CompanyUserAcceptedRoles,
  CompanyUserForm,
  CompanyUserFormValue,
} from "@/components/forms/CompanyUser/CompanyUser";
import {
  InviteUsersForm,
  InviteUsersFormValues,
} from "@/components/forms/InviteUsers/InviteUsers";
import { DEFAULT_PAGE_LIMIT } from "@/const";
import {
  CheckEmailAvailableRequest,
  CheckEmailAvailableResponse,
  CompanyUsersResponse,
  EditCompanyUserRequest,
  InviteUsersRequest,
} from "@/services/bll/modules/users/schema";
import { ActionProp, DataProp } from "@/types";
import { useTranslations } from "next-intl";
import {
  useCallback,
  useState,
  type ComponentPropsWithoutRef,
  type FC,
} from "react";
import { twMerge } from "tailwind-merge";
import { useCompanyUsersTable } from "./use-table";

type Props = {
  users: DataProp<CompanyUsersResponse>;
  onPageChange: (page: number) => void;
  onLimitChange: (limit: number) => void;
  onSearchChange: (search: string) => void;
  onStatusChange: (status: UserStatusesSelectOptions) => void;
  status: UserStatusesSelectOptions;
  checkEmailAction: ActionProp<
    CheckEmailAvailableRequest,
    CheckEmailAvailableResponse
  >;
  inviteUsersAction: ActionProp<InviteUsersRequest>;
  resendInviteAction: ActionProp<string>;
  cancelInviteAction: ActionProp<string>;
  editUserAction: ActionProp<EditCompanyUserRequest>;
  canManage: boolean;
};

export type ManageCompanyUsersTemplateProps =
  ComponentPropsWithoutRef<"section"> & Props;

export const ManageCompanyUsersTemplate: FC<ManageCompanyUsersTemplateProps> = (
  props
) => {
  const {
    canManage,
    editUserAction,
    resendInviteAction,
    cancelInviteAction,
    users,
    inviteUsersAction,
    checkEmailAction,
    onLimitChange,
    onPageChange,
    onSearchChange,
    onStatusChange,
    status,
    className,
    ...rest
  } = props;
  const t = useTranslations("page.company.users");

  const [isInviteModalOpen, setIsInviteModalOpen] = useState(false);
  const [userToEdit, setUserToEdit] = useState<{
    id: string;
    role: CompanyUserAcceptedRoles;
  } | null>(null);
  const [userToResendInvite, setUserToResendInvite] = useState<string | null>(
    null
  );
  const [userToCancelInvite, setUserToCancelInvite] = useState<string | null>(
    null
  );

  const { columns } = useCompanyUsersTable({
    onSelectUserToCancelInvite: setUserToCancelInvite,
    onSelectUserToEdit: setUserToEdit,
    onSelectUserToResendInvite: setUserToResendInvite,
    canManage,
  });

  const inviteUsersHandler = async (values: InviteUsersFormValues) => {
    try {
      await inviteUsersAction.handler(values);

      setIsInviteModalOpen(false);
    } catch (error) {}
  };

  const editUserHandler = async (values: CompanyUserFormValue) => {
    if (!userToEdit) return;

    try {
      await editUserAction.handler({ id: userToEdit.id, role: values.role });

      setIsInviteModalOpen(false);
    } catch (error) {}
  };

  const resendInviteHandler = useCallback(async () => {
    if (!userToResendInvite) return;

    try {
      await resendInviteAction.handler(userToResendInvite);

      setUserToResendInvite(null);
    } catch (error) {}
  }, [resendInviteAction, userToResendInvite]);

  const cancelInviteHandler = useCallback(async () => {
    if (!userToCancelInvite) return;

    try {
      await cancelInviteAction.handler(userToCancelInvite);

      setUserToCancelInvite(null);
    } catch (error) {}
  }, [cancelInviteAction, userToCancelInvite]);

  return (
    <>
      <section
        {...rest}
        className={twMerge("grid grid-cols-1 gap-3", className)}
      >
        <header className="grid grid-cols-1 gap-3">
          <TitleDescription
            title={t("title")}
            description={t("description")}
            titleLevel="h1"
          />
          <div className="flex items-center justify-between flex-wrap gap-3">
            <div className="flex-grow flex flex-wrap gap-3 items-center">
              <SearchForm placeholder={t("search")} onSearch={onSearchChange} />
              <UserStatusesSelect
                selectedKeys={status}
                withAll
                className="max-w-[220px]"
                onSelectChange={onStatusChange}
                aria-label={t("filter")}
              />
            </div>
            {canManage && (
              <Button
                color="primary"
                onClick={() => setIsInviteModalOpen(true)}
                text={t("invite-user.trigger")}
              />
            )}
          </div>
        </header>

        <TableWidget
          data={users.data?.data || []}
          isLoading={users.isLoading}
          columns={columns}
          limit={users.data?.meta.limit || DEFAULT_PAGE_LIMIT}
          onLimitChange={onLimitChange}
          onPageChange={onPageChange}
          page={users.data?.meta.page || 0}
          total={users.data?.meta.totalPages || 0}
        />
      </section>

      <ModalWithDescription
        isOpen={isInviteModalOpen}
        onClose={() => setIsInviteModalOpen(false)}
        size="xl"
        title={t("invite-user.title")}
        description={t("invite-user.description")}
      >
        <ModalWithDescription.Body>
          {inviteUsersAction.isLoading ||
            (checkEmailAction.isLoading && <LoadingOverlay isInWrapper />)}
          <InviteUsersForm
            cancel={{
              label: t("invite-user.cancel"),
              onClick: () => setIsInviteModalOpen(false),
            }}
            label={t("invite-user.label")}
            submitText={t("invite-user.submit")}
            onFormSubmit={inviteUsersHandler}
            onValidateEmailsRequest={checkEmailAction.handler}
          />
        </ModalWithDescription.Body>
      </ModalWithDescription>

      {userToEdit && (
        <ModalWithDescription
          isOpen={!!userToEdit}
          onClose={() => setUserToEdit(null)}
          size="xl"
          title={t("edit-user.title")}
          description={t("edit-user.description")}
        >
          <ModalWithDescription.Body>
            {editUserAction.isLoading ||
              (checkEmailAction.isLoading && <LoadingOverlay isInWrapper />)}
            <CompanyUserForm
              cancelText={t("edit-user.cancel")}
              role={userToEdit.role}
              onCancelClick={() => setIsInviteModalOpen(false)}
              label={t("edit-user.label")}
              submitText={t("edit-user.confirm")}
              onFormSubmit={editUserHandler}
            />
          </ModalWithDescription.Body>
        </ModalWithDescription>
      )}

      <ConfirmModal
        isOpen={!!userToResendInvite}
        onClose={() => setUserToResendInvite(null)}
        title={t("resend-invite.title")}
        description={t("resend-invite.description")}
        buttons={[
          {
            text: t("resend-invite.cancel"),
            variant: "bordered",
            onClick: () => setUserToResendInvite(null),
          },
          {
            text: t("resend-invite.confirm"),
            color: "primary",
            onClick: resendInviteHandler,
          },
        ]}
        isLoading={resendInviteAction.isLoading}
      />

      <ConfirmModal
        isOpen={!!userToCancelInvite}
        onClose={() => setUserToCancelInvite(null)}
        title={t("cancel-invite.title")}
        description={t("cancel-invite.description")}
        buttons={[
          {
            text: t("cancel-invite.cancel"),
            variant: "bordered",
            onClick: () => setUserToCancelInvite(null),
          },
          {
            text: t("cancel-invite.confirm"),
            color: "danger",
            onClick: cancelInviteHandler,
          },
        ]}
        isLoading={resendInviteAction.isLoading}
      />
    </>
  );
};
