import { ConfirmModal } from "@/components/UI/ConformModal/ConfirmModal";
import { TableWidget } from "@/components/UI/TableWidget/TableWidget";
import { TitleDescription } from "@/components/UI/TitleDescription/TitleDescription";
import { UserInfo } from "@/components/UI/UserInfo/UserInfo";
import {
  UserStatusesSelect,
  UserStatusesSelectOptions,
} from "@/components/UI/UserStatusesSelect/UserStatusesSelect";
import { Button, Icon, LoadingOverlay, Modal } from "@/components/base";
import { SearchForm } from "@/components/base/SearchForm/SearchForm";
import {
  EditCompanyUserAcceptedRoles,
  EditCompanyUserForm,
  EditCompanyUserFormValue,
} from "@/components/forms/EditCompanyUser/EditCompanyUser";
import {
  InviteUsersForm,
  InviteUsersFormValues,
} from "@/components/forms/InviteUsers/InviteUsers";
import { DEFAULT_PAGE_LIMIT } from "@/const";
import {
  CancelInviteRequest,
  CancelInviteResponse,
  CheckEmailAvailableRequest,
  CheckEmailAvailableResponse,
  CompanyUsersResponse,
  EditCompanyUserRequest,
  EditCompanyUserResponse,
  InviteUsersRequest,
  InviteUsersResponse,
  ResendInviteRequest,
  ResendInviteResponse,
} from "@/services/bll/modules/users/schema";
import { ActionProp, DataProp } from "@/types";
import { UserRoles } from "@prisma/client";
import { createColumnHelper } from "@tanstack/react-table";
import { useTranslations } from "next-intl";
import {
  useMemo,
  useState,
  type ComponentPropsWithoutRef,
  type FC,
} from "react";
import { twMerge } from "tailwind-merge";
import { undefined } from "zod";

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
  inviteUsersAction: ActionProp<InviteUsersRequest, InviteUsersResponse>;
  resendInviteAction: ActionProp<ResendInviteRequest, ResendInviteResponse>;
  cancelInviteAction: ActionProp<CancelInviteRequest, CancelInviteResponse>;
  editUserAction: ActionProp<EditCompanyUserRequest, EditCompanyUserResponse>;
};

export type ManageCompanyUsersProps = ComponentPropsWithoutRef<"section"> &
  Props;

const CH = createColumnHelper<CompanyUsersResponse["data"][number]>();

export const ManageCompanyUsers: FC<ManageCompanyUsersProps> = (props) => {
  const {
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
  const userT = useTranslations("entity.user");

  const [isInviteModalOpen, setIsInviteModalOpen] = useState(false);
  const [userToEdit, setUserToEdit] = useState<{
    id: string;
    role: EditCompanyUserAcceptedRoles;
  } | null>(null);
  const [userToResendInvite, setUserToResendInvite] = useState<string | null>(
    null
  );
  const [userToCancelInvite, setUserToCancelInvite] = useState<string | null>(
    null
  );

  const columns = useMemo(
    () => [
      CH.accessor("name", {
        enableSorting: false,
        header: t("table.user"),
        cell: (row) => (
          <UserInfo
            name={row.row.original.name}
            email={row.row.original.email}
            avatar={row.row.original.avatar?.url}
          />
        ),
      }),
      CH.accessor("isAcceptInvite", {
        enableSorting: false,
        header: t("table.accept-invite"),
        cell: (row) => (
          <Icon
            name={row.getValue() ? "HiCheckCircle" : "HiXCircle"}
            size={16}
            color={row.getValue() ? "green" : "red"}
          />
        ),
      }),
      CH.accessor("role", {
        enableSorting: false,
        header: t("table.role"),
        cell: (row) => userT(`role.${row.getValue()}`),
      }),
      CH.accessor("status", {
        enableSorting: false,
        header: t("table.status"),
        cell: (row) => userT(`status.${row.getValue()}`),
      }),
      CH.accessor("id", {
        enableSorting: false,
        header: t("table.actions.label"),
        cell: (row) => (
          <div>
            <Button
              color="primary"
              variant="light"
              size="sm"
              isIconOnly
              isDisabled={
                row.row.original.role === UserRoles.OWNER ||
                !row.row.original.isAcceptInvite
              }
              onClick={() =>
                setUserToEdit({
                  id: row.getValue(),
                  role: row.row.original.role as EditCompanyUserAcceptedRoles,
                })
              }
              tooltip={t("table.actions.edit")}
              aria-label={t("table.actions.edit")}
            >
              <Icon name="HiPencil" size={16} />
            </Button>
            {!row.row.original.isAcceptInvite && (
              <>
                <Button
                  color="secondary"
                  variant="light"
                  size="sm"
                  isIconOnly
                  onClick={() => setUserToResendInvite(row.getValue())}
                  tooltip={t("table.actions.resend-invite")}
                  aria-label={t("table.actions.resend-invite")}
                >
                  <Icon name="HiRefresh" size={16} />
                </Button>
                <Button
                  color="danger"
                  variant="light"
                  size="sm"
                  isIconOnly
                  onClick={() => setUserToCancelInvite(row.getValue())}
                  tooltip={t("table.actions.cancel-invite")}
                  aria-label={t("table.actions.cancel-invite")}
                >
                  <Icon name="HiOutlineBan" size={16} />
                </Button>
              </>
            )}
          </div>
        ),
      }),
    ],
    [t, userT]
  );

  const inviteUsersHandler = async (values: InviteUsersFormValues) => {
    try {
      await inviteUsersAction.handler(values);

      setIsInviteModalOpen(false);
    } catch (error) {}
  };

  const editUserHandler = async (values: EditCompanyUserFormValue) => {
    if (!userToEdit) return;

    try {
      await editUserAction.handler({ id: userToEdit.id, role: values.role });

      setIsInviteModalOpen(false);
    } catch (error) {}
  };

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
            <Button color="primary" onClick={() => setIsInviteModalOpen(true)}>
              {t("invite-user.trigger")}
            </Button>
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

      <Modal
        isOpen={isInviteModalOpen}
        onClose={() => setIsInviteModalOpen(false)}
        size="xl"
        title={t("invite-user.title")}
        description={t("invite-user.description")}
      >
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
      </Modal>

      {userToEdit && (
        <Modal
          isOpen={!!userToEdit}
          onClose={() => setUserToEdit(null)}
          size="xl"
          title={t("edit-user.title")}
          description={t("edit-user.description")}
        >
          {editUserAction.isLoading ||
            (checkEmailAction.isLoading && <LoadingOverlay isInWrapper />)}
          <EditCompanyUserForm
            cancelText={t("edit-user.cancel")}
            role={userToEdit.role}
            onCancelClick={() => setIsInviteModalOpen(false)}
            label={t("edit-user.label")}
            submitText={t("edit-user.confirm")}
            onFormSubmit={editUserHandler}
          />
        </Modal>
      )}

      <ConfirmModal
        isOpen={!!userToResendInvite}
        onClose={() => setUserToResendInvite(null)}
        title={t("resend-invite.title")}
        description={t("resend-invite.description")}
        cancel={{
          text: t("resend-invite.cancel"),
          onClick: () => setUserToResendInvite(null),
        }}
        confirm={{
          text: t("resend-invite.confirm"),
          onClick: async () =>
            userToResendInvite
              ? resendInviteAction.handler({ id: userToResendInvite })
              : undefined,
        }}
        isLoading={resendInviteAction.isLoading}
      />

      <ConfirmModal
        isOpen={!!userToCancelInvite}
        onClose={() => setUserToCancelInvite(null)}
        title={t("cancel-invite.title")}
        description={t("cancel-invite.description")}
        cancel={{
          text: t("cancel-invite.cancel"),
          onClick: () => setUserToCancelInvite(null),
        }}
        confirm={{
          text: t("cancel-invite.confirm"),
          onClick: async () =>
            userToCancelInvite
              ? cancelInviteAction.handler({ id: userToCancelInvite })
              : undefined,
        }}
        isLoading={resendInviteAction.isLoading}
      />
    </>
  );
};
