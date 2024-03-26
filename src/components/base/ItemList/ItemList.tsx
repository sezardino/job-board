import { ReactNode, type ComponentPropsWithoutRef } from "react";
import { twMerge } from "tailwind-merge";
import { Badge, BadgeVariant } from "../Badge/Badge";

import styles from "./ItemList.module.scss";
import { Typography } from "../Typography/Typography";

type Props<T> = {
  items: T[];
  maxLength?: number;
  renderItem: (item: T) => ReactNode;
  withCommas?: boolean;
  badgeVariant?: BadgeVariant;
};

export type ItemListProps<T> = ComponentPropsWithoutRef<"ul"> & Props<T>;

export const ItemList = <T,>(props: ItemListProps<T>) => {
  const {
    items,
    maxLength = 6,
    renderItem,
    withCommas = false,
    badgeVariant,
    className,
    children,
    ...rest
  } = props;

  const itemsToDisplay = items.slice(0, maxLength);

  const hiddenCount =
    maxLength && items.length > maxLength ? items.length - (maxLength || 0) : 0;

  return (
    <ul {...rest} className={twMerge(styles.element, className)}>
      {itemsToDisplay.map((item, index) => (
        <li key={index}>
          {renderItem(item)}
          {withCommas && index < itemsToDisplay.length - 1 && (
            <Typography tag="span" styling="xs">
              ,{" "}
            </Typography>
          )}
        </li>
      ))}
      {!!hiddenCount && (
        <li>
          <Badge variant={badgeVariant} size="sm">
            +{hiddenCount}
          </Badge>
        </li>
      )}
    </ul>
  );
};
