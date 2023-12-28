import { AdminUsersResponse } from "@/services/server/modules/users/schema";
import { createColumnHelper } from "@tanstack/react-table";
import { useTranslations } from "next-intl";
import {
  useCallback,
  useMemo,
  useState,
  type ComponentPropsWithoutRef,
  type FC,
} from "react";
import { twMerge } from "tailwind-merge";
import { TableWidget } from "../../UI/TableWidget/TableWidget";
import { UserInfo } from "../../UI/UserInfo/UserInfo";
import { Button, Icon, LoadingOverlay, Modal } from "../../base";
import { SearchForm } from "../../base/SearchForm/SearchForm";
import { AuthForm, AuthFormValues } from "../../forms";

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

export type ManageAdminsTemplateProps = ComponentPropsWithoutRef<"section"> &
  Props;

const CH = createColumnHelper<AdminUsersResponse["users"][number]>();

export const ManageAdminsTemplate: FC<ManageAdminsTemplateProps> = (props) => {
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
  const userT = useTranslations("entity.user");

  const [isInviteAdminModalOpen, setIsInviteAdminModalOpen] = useState(false);

  const columns = useMemo(
    () => [
      CH.accessor("email", {
        enableSorting: false,
        header: t("table.head.info"),
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
        header: t("table.head.is-email-verified"),
        cell: (row) => (
          <Icon
            name={row.getValue() ? "HiCheckCircle" : "HiXCircle"}
            color={row.getValue() ? "green" : "red"}
            size={16}
          />
        ),
      }),
      CH.accessor("role", {
        enableSorting: false,
        header: t("table.head.role"),
        cell: (row) => userT(`role.${row.getValue()}`),
      }),
      CH.accessor("status", {
        enableSorting: false,
        header: t("table.head.status"),
        cell: (row) => userT(`status.${row.getValue()}`),
      }),
    ],
    [t, userT]
  );

  const inviteAdminHandler = useCallback(
    async (values: AuthFormValues) => {
      try {
        await onInviteAdminFormSubmit(values);
        setIsInviteAdminModalOpen(false);
      } catch (error) {
        console.log(error);
      }
    },
    [onInviteAdminFormSubmit]
  );

  return (
    <>
      <section {...rest} className={twMerge("", className)}>
        <header className="flex justify-between gap-3 flex-wrap items-center">
          <SearchForm onSearch={onSearchChange} />
          <Button
            color="primary"
            onClick={() => setIsInviteAdminModalOpen(true)}
          >
            {t("invite.trigger")}
          </Button>
        </header>
        <TableWidget
          // @ts-ignore
          columns={columns}
          data={data?.users || []}
          isLoading={isTableDataLoading}
          noDataMessage={t("table.no-data")}
          page={data?.meta.page || 0}
          limit={data?.meta.limit || 10}
          total={data?.meta.totalPages || 0}
          className="mt-4"
          onLimitChange={onLimitChange}
          onPageChange={onPageChange}
        />
      </section>

      <Modal
        isOpen={isInviteAdminModalOpen}
        onClose={() => setIsInviteAdminModalOpen(false)}
        title={t("invite.title")}
        description={t("invite.description")}
      >
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
      </Modal>
    </>
  );
};
