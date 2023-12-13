import { cn } from "@nextui-org/react";
import { type ComponentPropsWithoutRef, type FC } from "react";

type Props = {};

export type CompanyTemplateProps = ComponentPropsWithoutRef<"section"> & Props;

export const CompanyTemplate: FC<CompanyTemplateProps> = (props) => {
  const { className, ...rest } = props;

  return <section {...rest} className={cn(className)}></section>;
};
