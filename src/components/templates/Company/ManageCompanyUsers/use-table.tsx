import { UserInfo } from "@/components/UI/UserInfo/UserInfo";
import { Button } from "@/components/base/Button/Button";
import { Icon } from "@/components/base/Icon/Icon";
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
  const userT = useTranslations("entity.users");

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
              text={t("table.actions.edit")}
              endContent={<Icon name="HiPencil" size={16} />}
            />
            {!row.row.original.isAcceptInvite && (
              <>
                <Button
                  color="secondary"
                  variant="light"
                  size="sm"
                  isIconOnly
                  onClick={() => onSelectUserToResendInvite(row.getValue())}
                  text={t("table.actions.resend-invite")}
                  endContent={<Icon name="HiRefresh" size={16} />}
                />
                <Button
                  color="danger"
                  variant="light"
                  size="sm"
                  isIconOnly
                  onClick={() => onSelectUserToCancelInvite(row.getValue())}
                  text={t("table.actions.cancel-invite")}
                  endContent={<Icon name="HiOutlineBan" size={16} />}
                />
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
