import { type ComponentPropsWithoutRef, type FC } from "react";

export type CompanyDashboardProps = ComponentPropsWithoutRef<"section"> & {};

export const CompanyDashboard: FC<CompanyDashboardProps> = (props) => {
  const { className, ...rest } = props;

  return <section {...rest} className={className}></section>;
};
