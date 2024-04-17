import { TableActions } from "@/components/UI/TableActions/TableActions";
import {
  TableWidget,
  TableWidgetProps,
} from "@/components/UI/TableWidget/TableWidget";
import { AdminPageUrls } from "@/const";
import { AdminCategoriesResponse } from "@/services/bll/modules/categories/schema";
import { createColumnHelper } from "@tanstack/react-table";
import { useTranslations } from "next-intl";
import Link from "next/link";
import { FC, useMemo } from "react";

type Category = AdminCategoriesResponse["data"][number];

type Props = {
  industryId: string;
};

type OmittedProps = Omit<TableWidgetProps<Category>, "columns">;

export type CategoriesTableProps = OmittedProps & Props;

const CH = createColumnHelper<Category>();

export const CategoriesTable: FC<CategoriesTableProps> = (props) => {
  const { industryId, ...rest } = props;

  const t = useTranslations("components.admin.manage-categories-table");
  const statusT = useTranslations("entity.common.status");
  const categoriesT = useTranslations("entity.categories");

  const columns = useMemo(
    () => [
      CH.accessor("name", {
        enableSorting: false,
        header: t("head.name"),
        cell: (row) => categoriesT(row.getValue()),
      }),
      CH.accessor("status", {
        enableSorting: false,
        header: t("head.status"),
        cell: (row) => statusT(row.getValue()),
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
                  text: t("actions.offers"),
                  icon: "HiDocumentText",
                  color: "secondary",
                  variant: "light",
                  as: Link,
                  href: AdminPageUrls.categoryOffers(
                    industryId,
                    row.getValue()
                  ),
                },
              ]}
            />
          </>
        ),
      }),
    ],
    [t, categoriesT, statusT, industryId]
  );

  return (
    <TableWidget {...rest} columns={columns} noDataMessage={t("no-data")} />
  );
};
