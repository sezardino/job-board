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
  InviteUsersForm,
  InviteUsersFormValues,
} from "@/components/forms/InviteUsers/InviteUsers";
import { DEFAULT_PAGE_LIMIT } from "@/const";
import {
  CheckEmailsAvailableRequest,
  CheckEmailsAvailableResponse,
  CompanyUsersResponse,
  InviteUsersRequest,
  InviteUsersResponse,
} from "@/services/server/modules/users/schema";
import { ActionProp, DataProp } from "@/types";
import { createColumnHelper } from "@tanstack/react-table";
import { useTranslations } from "next-intl";
import {
  useMemo,
  useState,
  type ComponentPropsWithoutRef,
  type FC,
} from "react";
import { twMerge } from "tailwind-merge";

type Props = {
  users: DataProp<CompanyUsersResponse>;
  onPageChange: (page: number) => void;
  onLimitChange: (limit: number) => void;
  onSearchChange: (search: string) => void;
  onStatusChange: (status: UserStatusesSelectOptions) => void;
  status: UserStatusesSelectOptions;
  checkEmailAction: ActionProp<
    CheckEmailsAvailableRequest,
    CheckEmailsAvailableResponse
  >;
  inviteUsersAction: ActionProp<InviteUsersRequest, InviteUsersResponse>;
};

export type ManageCompanyUsersProps = ComponentPropsWithoutRef<"section"> &
  Props;

const CH = createColumnHelper<CompanyUsersResponse["users"][number]>();

export const ManageCompanyUsers: FC<ManageCompanyUsersProps> = (props) => {
  const {
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

  const columns = useMemo(
    () => [
      CH.accessor("name", {
        enableSorting: false,
        header: t("table.user"),
        cell: (row) => (
          <UserInfo
            name={row.row.original.name}
            email={row.row.original.email}
          />
        ),
      }),
      CH.accessor("isEmailVerified", {
        enableSorting: false,
        header: t("table.is-email-verified"),
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
    ],
    [t, userT]
  );

  const inviteUsersHandler = async (values: InviteUsersFormValues) => {
    try {
      await inviteUsersAction.handler(values);

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
              />
            </div>
            <Button color="primary" onClick={() => setIsInviteModalOpen(true)}>
              {t("invite-user.trigger")}
            </Button>
          </div>
        </header>

        <TableWidget
          data={users.data?.users || []}
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
            label: "Cancel",
            onClick: () => setIsInviteModalOpen(false),
          }}
          label="invite"
          submitText="invite"
          onFormSubmit={inviteUsersHandler}
          onValidateEmailsRequest={checkEmailAction.handler}
        />
      </Modal>
    </>
  );
};
