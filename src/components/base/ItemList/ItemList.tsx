import { ReactNode, type ComponentPropsWithoutRef } from "react";
import { twMerge } from "tailwind-merge";
import { Badge, BadgeVariant } from "../Badge/Badge";

import { Popover, PopoverContent, PopoverTrigger } from "@nextui-org/react";
import { Typography } from "../Typography/Typography";
import styles from "./ItemList.module.scss";

type Props<T> = {
  items: T[];
  maxLength?: number;
  renderItem: (item: T) => ReactNode;
  renderRestItem?: (item: T) => ReactNode;
  withCommas?: boolean;
  badgeVariant?: BadgeVariant;
};

export type ItemListProps<T> = ComponentPropsWithoutRef<"ul"> & Props<T>;

export const ItemList = <T,>(props: ItemListProps<T>) => {
  const {
    items,
    maxLength = 6,
    renderItem,
    renderRestItem = renderItem,
    withCommas = false,
    badgeVariant,
    className,
    children,
    ...rest
  } = props;

  const itemsToDisplay = items.slice(0, maxLength);

  const hiddenCount =
    maxLength && items.length > maxLength ? items.length - (maxLength || 0) : 0;

  const restItems = items.slice(maxLength);

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
          <Popover>
            <PopoverTrigger>
              <Badge variant={badgeVariant} size="sm">
                +{hiddenCount}
              </Badge>
            </PopoverTrigger>
            <PopoverContent>
              <ul className={styles.list}>
                {restItems.map((item, index) => (
                  <li key={index}>{renderRestItem(item)}</li>
                ))}
              </ul>
            </PopoverContent>
          </Popover>
        </li>
      )}
    </ul>
  );
};
