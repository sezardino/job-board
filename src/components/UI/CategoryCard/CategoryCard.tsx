import { Button } from "@/components/base/Button/Button";
import { Icon } from "@/components/base/Icon/Icon";
import { useTranslations } from "next-intl";
import Link from "next/link";
import { type ComponentPropsWithoutRef, type FC } from "react";
import { categoriesIconMapping } from "./icons";

type Props = {
  name: string;
  prefix?: string;
  isActive: boolean;
};

export type CategoryCardProps = Omit<
  ComponentPropsWithoutRef<"button">,
  "onFocus" | "onBlur" | "color"
> &
  Props;

export const CategoryCard: FC<CategoryCardProps> = (props) => {
  const { name, prefix, isActive, className, ...rest } = props;
  const categoryT = useTranslations("entity.categories");

  const iconName = categoriesIconMapping[name] || "HiQuestionMarkCircle";

  return (
    <Button
      {...rest}
      isIconOnly
      as={Link}
      href={prefix ? prefix + "/" + name : name}
      color={isActive ? "primary" : undefined}
      offset={20}
      text={categoryT(name)}
      startContent={<Icon name={iconName} size={24} />}
    />
  );
};
