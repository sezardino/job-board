import { Typography, TypographyTag } from "@/components/base";
import { type ComponentPropsWithoutRef, type FC } from "react";
import { twMerge } from "tailwind-merge";

type Props = {
  title: string;
  titleLevel: TypographyTag;
  description?: string;
};

export type TitleDescriptionProps = ComponentPropsWithoutRef<"div"> & Props;

export const TitleDescription: FC<TitleDescriptionProps> = (props) => {
  const { title, titleLevel, description, className, ...rest } = props;

  return (
    <div {...rest} className={twMerge("grid grid-cols-1 gap-1", className)}>
      <Typography tag={titleLevel} styling="lg">
        {title}
      </Typography>
      {description && (
        <Typography tag="p" styling="sm">
          {description}
        </Typography>
      )}
    </div>
  );
};
