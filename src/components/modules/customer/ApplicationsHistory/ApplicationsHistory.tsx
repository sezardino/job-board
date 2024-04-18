import { PublicPageUrls } from "@/const";
import { Link, Skeleton } from "@nextui-org/react";
import dayjs from "dayjs";
import NextLink from "next/link";
import { ComponentPropsWithoutRef, FC } from "react";
import { twMerge } from "tailwind-merge";
import styles from "./ApplicationsHistory.module.scss";

export type ApplicationsHistoryItem = {
  date: string;
  items: { id: string; name: string }[];
};

type Props = {
  isLoading: boolean;
  items: ApplicationsHistoryItem[];
};

export type ApplicationsHistoryProps = ComponentPropsWithoutRef<"ol"> & Props;

export const ApplicationsHistory: FC<ApplicationsHistoryProps> = (props) => {
  const { isLoading, items, className, ...rest } = props;

  return (
    <ol
      {...rest}
      className={twMerge(
        styles.element,
        isLoading && styles.loading,
        className
      )}
    >
      {isLoading &&
        new Array(9).fill(0).map((_, index) => (
          <li key={index} className={styles.item}>
            <div className={styles.mark} />
            <Skeleton key={index} className="h-14" />
          </li>
        ))}
      {!isLoading &&
        items.map((item) => (
          <li key={item.date} className={styles.item}>
            <div className={styles.mark} />
            <time className={styles.time}>
              {dayjs(item.date).format("DD MM YYYY")}
            </time>
            <h2 className={styles.title}>
              applied in {dayjs(item.date).format("DD MM YYYY")}
            </h2>
            <ul className={styles.sublist}>
              {item.items.map((subitem) => (
                <li key={subitem.id} className={styles.subitem}>
                  <Link as={NextLink} href={PublicPageUrls.offer(subitem.id)}>
                    <span>{subitem.name}</span>
                  </Link>
                </li>
              ))}
            </ul>
          </li>
        ))}
    </ol>
  );
};
