import { TitleDescription } from "@/components/UI/TitleDescription/TitleDescription";
import { Grid } from "@/components/base/Grid/Grid";
import { Select, SelectOption } from "@/components/base/Select/Select";
import {
  StatisticListItem,
  StatisticsList,
} from "@/components/modules/shared/StatisticsList/StatisticsList";
import { AdminStatisticsResponse } from "@/services/bll/modules/statistics/schema";
import { QueryProps, StatisticPeriod } from "@/types";
import { useTranslations } from "next-intl";
import { ComponentPropsWithoutRef, FC, useMemo } from "react";
import { twMerge } from "tailwind-merge";
import styles from "./AdminDashboardTemplate.module.scss";

type Props = {
  statistics: QueryProps<AdminStatisticsResponse>;
  selectedPeriod: StatisticPeriod;
  onChangeSelectedPeriod: (period: StatisticPeriod) => void;
};

export type AdminDashboardTemplateProps = ComponentPropsWithoutRef<"div"> &
  Props;

export const AdminDashboardTemplate: FC<AdminDashboardTemplateProps> = (
  props
) => {
  const {
    statistics,
    selectedPeriod,
    onChangeSelectedPeriod,
    className,
    ...rest
  } = props;
  const t = useTranslations("page.admin.dashboard");
  const periodT = useTranslations("entity.common.period");

  const statisticItems = useMemo<StatisticListItem[]>(() => {
    if (!statistics.data) return [];

    return Object.entries(statistics.data).map(([key, value]) => ({
      ...value,
      label: t(`statistics.${key}.label`),
      currentTooltip: t(`statistics.${key}.current`),
      prevTooltip: t(`statistics.${key}.prev`),
      key,
    }));
  }, [statistics.data, t]);

  const periodSelectOptions = useMemo<SelectOption<StatisticPeriod>[]>(
    () => [
      {
        id: StatisticPeriod.Week,
        label: periodT(StatisticPeriod.Week),
      },
      {
        id: StatisticPeriod.TwoWeeks,
        label: periodT(StatisticPeriod.TwoWeeks),
      },
      {
        id: StatisticPeriod.Month,
        label: periodT(StatisticPeriod.Month),
      },
      {
        id: StatisticPeriod.Quarter,
        label: periodT(StatisticPeriod.Quarter),
      },
      {
        id: StatisticPeriod.Year,
        label: periodT(StatisticPeriod.Year),
      },
    ],
    [periodT]
  );

  return (
    <Grid {...rest} gap={8} className={twMerge(styles.element, className)}>
      <TitleDescription
        title={t("title")}
        description={t("description")}
        titleLevel="h1"
        titleStyling="2xl"
      />
      <section>
        <header className={styles.wrapper}>
          <TitleDescription
            title={t("statistics.title")}
            description={t("statistics.description")}
            titleLevel="h2"
            titleStyling="lg"
          />
          <Select
            isMultiple={false}
            selectedKeys={[selectedPeriod.toString()]}
            options={periodSelectOptions}
            onSelectChange={(selectedPeriod: StatisticPeriod) =>
              onChangeSelectedPeriod(selectedPeriod)
            }
            className={styles.select}
          />
        </header>
        <StatisticsList
          items={statisticItems}
          isLoading={statistics.isFetching}
          className={styles.statistics}
        />
      </section>
    </Grid>
  );
};
