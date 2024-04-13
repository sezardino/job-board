import { Button, ButtonProps } from "@/components/base/Button/Button";
import { ComponentPropsWithoutRef, FC } from "react";
import { twMerge } from "tailwind-merge";

import { Icon, IconNames } from "@/components/base/Icon/Icon";
import styles from "./TableActions.module.scss";

type Action = Omit<ButtonProps, "size"> & { icon: IconNames };

type Props = {
  actions: Action[];
};

export type TableActionsProps = ComponentPropsWithoutRef<"div"> & Props;

export const TableActions: FC<TableActionsProps> = (props) => {
  const { actions, className, ...rest } = props;

  return (
    <div {...rest} className={twMerge(styles.element, className)}>
      {actions.map((action, index) => (
        <Button
          key={index}
          {...action}
          isIconOnly
          size="sm"
          startContent={<Icon name={action.icon} size={20} />}
        />
      ))}
    </div>
  );
};
