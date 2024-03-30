import { type ComponentPropsWithoutRef, type FC } from "react";

import { twMerge } from "tailwind-merge";
import styles from "./CompanyDashboardTemplate.module.scss";

export type CompanyDashboardTemplateProps =
  ComponentPropsWithoutRef<"section"> & {};

export const CompanyDashboardTemplate: FC<CompanyDashboardTemplateProps> = (
  props
) => {
  const { className, ...rest } = props;

  return (
    <section {...rest} className={twMerge(styles.element, className)}></section>
  );
};
