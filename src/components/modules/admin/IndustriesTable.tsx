import { TableActions } from "@/components/UI/TableActions/TableActions";
import {
  TableWidget,
  TableWidgetProps,
} from "@/components/UI/TableWidget/TableWidget";
import { AdminPageUrls } from "@/const";
import { AdminIndustriesResponse } from "@/services/bll/modules/industries/schema";
import { EntityStatus } from "@prisma/client";
import { createColumnHelper } from "@tanstack/react-table";
import { useTranslations } from "next-intl";
import Link from "next/link";
import { FC, useMemo } from "react";

type Industry = AdminIndustriesResponse["data"][number];

type Props = {
  onSelectToUpdate: (args: { id: string; status: EntityStatus }) => void;
  onSelectToDelete: (id: string) => void;
};

type OmittedProps = Omit<TableWidgetProps<Industry>, "columns">;

export type IndustriesTableProps = OmittedProps & Props;

const CH = createColumnHelper<Industry>();

export const IndustriesTable: FC<IndustriesTableProps> = (props) => {
  const { onSelectToDelete, onSelectToUpdate, ...rest } = props;

  const t = useTranslations("components.admin.manage-industries-table");
  const statusT = useTranslations("entity.common.status");
  const industriesT = useTranslations("entity.industries");

  const columns = useMemo(
    () => [
      CH.accessor("name", {
        enableSorting: false,
        header: t("head.name"),
        cell: (row) => industriesT(row.getValue()),
      }),
      CH.accessor("status", {
        enableSorting: false,
        header: t("head.status"),
        cell: (row) => statusT(row.getValue()),
      }),
      CH.accessor("_count.categories", {
        enableSorting: false,
        header: t("head.categories"),
      }),
      CH.accessor("_count.offers", {
        enableSorting: false,
        header: t("head.offers"),
      }),
      CH.accessor("id", {
        enableSorting: false,
        header: () => null,
        cell: (row) => (
          <>
            <TableActions
              actions={[
                {
                  text: t("actions.categories"),
                  icon: "HiEye",
                  color: "primary",
                  variant: "light",
                  as: Link,
                  href: AdminPageUrls.categories(row.getValue()),
                },
                {
                  text: t("actions.offers"),
                  icon: "HiDocumentText",
                  color: "secondary",
                  variant: "light",
                  as: Link,
                  href: AdminPageUrls.industryOffers(row.getValue()),
                },
                {
                  text: t("actions.edit"),
                  icon: "HiPencil",
                  color: "warning",
                  variant: "light",
                  onClick: () =>
                    onSelectToUpdate({
                      id: row.getValue(),
                      status: row.row.original.status,
                    }),
                },
                {
                  text: t("actions.delete.active"),
                  icon: "HiTrash",
                  variant: "light",
                  color: "danger",
                  disabledText: t("actions.delete.disabled"),
                  isDisabled:
                    row.row.original._count.categories > 0 ||
                    row.row.original._count.offers > 0,
                  onClick: () => onSelectToDelete(row.getValue()),
                },
              ]}
            />
          </>
        ),
      }),
    ],
    [t, statusT, onSelectToUpdate, onSelectToDelete]
  );

  return (
    <TableWidget
      {...rest}
      // @ts-ignore
      columns={columns}
      noDataMessage={t("no-data")}
    />
  );
};
