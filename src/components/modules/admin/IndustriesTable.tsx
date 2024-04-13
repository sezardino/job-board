import { TableActions } from "@/components/UI/TableActions/TableActions";
import {
  TableWidget,
  TableWidgetProps,
} from "@/components/UI/TableWidget/TableWidget";
import { AdminIndustriesResponse } from "@/services/bll/modules/industries/schema";
import { EntityStatus } from "@prisma/client";
import { createColumnHelper } from "@tanstack/react-table";
import { useTranslations } from "next-intl";
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

  const t = useTranslations("page.admin.manage-industries");
  const statusT = useTranslations("entity.common.status");

  const columns = useMemo(
    () => [
      CH.accessor("name", {
        enableSorting: false,
        header: t("table.head.name"),
      }),
      CH.accessor("status", {
        enableSorting: false,
        header: t("table.head.status"),
        cell: (row) => statusT(row.getValue()),
      }),
      CH.accessor("_count.categories", {
        enableSorting: false,
        header: t("table.head.categories"),
      }),
      CH.accessor("_count.offers", {
        enableSorting: false,
        header: t("table.head.offers"),
      }),
      CH.accessor("id", {
        enableSorting: false,
        header: () => null,
        cell: (row) => (
          <>
            <TableActions
              actions={[
                {
                  text: t("update.trigger"),
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
                  text: t("delete.trigger"),
                  icon: "HiTrash",
                  variant: "light",
                  color: "danger",
                  disabledText: t("delete.disabled"),
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
      noDataMessage={t("table.no-data")}
    />
  );
};
