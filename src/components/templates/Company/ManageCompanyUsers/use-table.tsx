import { UserInfo } from "@/components/UI/UserInfo/UserInfo";
import { Button, Icon } from "@/components/base";
import { EditCompanyUserAcceptedRoles } from "@/components/forms/EditCompanyUser/EditCompanyUser";
import { CompanyUsersResponse } from "@/services/bll/modules/users/schema";
import { UserRoles } from "@prisma/client";
import { createColumnHelper } from "@tanstack/react-table";
import { useTranslations } from "next-intl";
import { useMemo } from "react";

type Props = {
  onSelectUserToEdit: (user: {
    id: string;
    role: EditCompanyUserAcceptedRoles;
  }) => void;
  onSelectUserToResendInvite: (id: string) => void;
  onSelectUserToCancelInvite: (id: string) => void;
};

const CH = createColumnHelper<CompanyUsersResponse["data"][number]>();

export const useCompanyUsersTable = (props: Props) => {
  const {
    onSelectUserToCancelInvite,
    onSelectUserToEdit,
    onSelectUserToResendInvite,
  } = props;

  const t = useTranslations("page.company.users");
  const userT = useTranslations("entity.user");

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
                onSelectUserToEdit({
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
                  onClick={() => onSelectUserToResendInvite(row.getValue())}
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
                  onClick={() => onSelectUserToCancelInvite(row.getValue())}
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
    [
      onSelectUserToCancelInvite,
      onSelectUserToEdit,
      onSelectUserToResendInvite,
      t,
      userT,
    ]
  );

  return { columns };
};
