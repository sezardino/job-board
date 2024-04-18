import {
  ApplicationsHistory,
  ApplicationsHistoryItem,
} from "@/components/modules/customer/ApplicationsHistory/ApplicationsHistory";
import { PaginationWidget } from "@/components/modules/shared/PaginationWidget/PaginationWidget";
import { ApplicationHistoryResponse } from "@/services/bll/modules/application/schema";
import { QueryProps } from "@/types";
import dayjs from "dayjs";
import { FC, useMemo } from "react";

type Props = {
  history: QueryProps<ApplicationHistoryResponse>;
  onLimitChange: (limit: number) => void;
  onPageChange: (page: number) => void;
  limit: number;
  page: number;
};

export type ProfileTemplateProps = Props;

export const ProfileTemplate: FC<ProfileTemplateProps> = (props) => {
  const { history, onLimitChange, onPageChange, limit, page } = props;

  const historyItems = useMemo<ApplicationsHistoryItem[]>(() => {
    if (!history.data) return [];

    const items: ApplicationsHistoryItem[] = [];

    history.data.data.forEach((item) => {
      const { offer, createdAt } = item;

      const indexOf = items.findIndex((i) => {
        console.log(dayjs(i.date).isSame(dayjs(createdAt), "date"));
        return dayjs(i.date).isSame(dayjs(createdAt), "date");
      });

      if (indexOf === -1) {
        items.push({
          date: createdAt,
          items: [offer],
        });
      } else {
        items[indexOf].items.push(offer);
      }
    });

    return items;
  }, [history.data]);

  return (
    <section className="py-6">
      <ApplicationsHistory
        isLoading={history.isFetching}
        items={historyItems}
      />
      <PaginationWidget
        current={page}
        total={history.data?.meta.count || 0}
        onPageChange={onPageChange}
        limit={limit}
        disabled={history.isFetching}
        onLimitChange={onLimitChange}
      />
    </section>
  );
};
