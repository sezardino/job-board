import { Icon } from "@/components/base/Icon/Icon";
import { Typography } from "@/components/base/Typography/Typography";
import { StatisticChange, StatisticsResponse } from "@/types";
import { ComponentPropsWithoutRef, FC } from "react";
import { twMerge } from "tailwind-merge";

import { Skeleton, Tooltip } from "@nextui-org/react";
import styles from "./StatisticsList.module.scss";

export type StatisticListItem = StatisticsResponse & {
  label: string;
  key: string;
  prevTooltip?: string;
  currentTooltip?: string;
};

type Props = {
  items: StatisticListItem[];
  isLoading: boolean;
};

export type StatisticsListProps = ComponentPropsWithoutRef<"ul"> & Props;

export const StatisticsList: FC<StatisticsListProps> = (props) => {
  const { isLoading, items, className, ...rest } = props;

  return (
    <ul {...rest} className={twMerge(styles.element, className)}>
      {isLoading &&
        new Array(4)
          .fill(null)
          .map((_, index) => (
            <Skeleton key={index} className={styles.loader} />
          ))}
      {!isLoading &&
        !!items.length &&
        items.map(
          ({
            label,
            key,
            type,
            currentPeriod,
            prevPeriod,
            statistics,
            prevTooltip,
            currentTooltip,
          }) => (
            <div key={key} className={styles.item}>
              <div
                className={twMerge(
                  type === StatisticChange.Increase
                    ? "text-success"
                    : type === StatisticChange.Decrease
                    ? "text-danger"
                    : "",
                  styles.wrapper
                )}
              >
                <Tooltip isDisabled={!prevTooltip} content={prevTooltip}>
                  <Typography tag="p" color="default" styling="sm">
                    {prevPeriod}
                  </Typography>
                </Tooltip>
                <Tooltip isDisabled={!currentTooltip} content={currentTooltip}>
                  <Typography tag="p" styling="xl">
                    {currentPeriod}
                  </Typography>
                </Tooltip>
                {type !== StatisticChange.NoChange && (
                  <p>
                    <Typography tag="span">{statistics}</Typography>
                    <Icon
                      name={
                        type === StatisticChange.Increase
                          ? "HiOutlineTrendingUp"
                          : "HiOutlineTrendingDown"
                      }
                    />
                  </p>
                )}
              </div>
              <Typography tag="h2" styling="lg">
                {label}
              </Typography>
            </div>
          )
        )}
    </ul>
  );
};
