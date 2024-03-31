import { Button } from "@/components/base/Button/Button";
import { Icon } from "@/components/base/Icon/Icon";
import { Typography } from "@/components/base/Typography/Typography";
import { Tooltip } from "@nextui-org/react";
import { useTranslations } from "next-intl";
import Link from "next/link";
import { type ComponentPropsWithoutRef, type FC } from "react";
import { twMerge } from "tailwind-merge";
import { categoriesIconMapping } from "./icons";

import styles from "./CategoryCard.module.scss";

type Props = {
  name: string;
  prefix?: string;
  isActive: boolean;
  labelType?: "tooltip" | "label";
};

type OmittedProps = Omit<
  ComponentPropsWithoutRef<"a">,
  "onFocus" | "onBlur" | "color"
>;

export type CategoryCardProps = OmittedProps & Props;

export const CategoryCard: FC<CategoryCardProps> = (props) => {
  const {
    labelType = "tooltip",
    name,
    prefix,
    isActive,
    className,
    ...rest
  } = props;
  const categoryT = useTranslations("entity.categories");

  const iconName = categoriesIconMapping[name] || "HiQuestionMarkCircle";

  return (
    <Tooltip isDisabled={labelType !== "tooltip"} content={categoryT(name)}>
      <Link
        {...rest}
        href={prefix ? prefix + "/" + name : name}
        className={twMerge(styles.element)}
      >
        <Button as="div" isIconOnly color={isActive ? "primary" : undefined}>
          <Icon name={iconName} size={24} />
        </Button>
        {labelType === "label" && (
          <Typography tag="span">{categoryT(name)}</Typography>
        )}
      </Link>
    </Tooltip>
  );
};
