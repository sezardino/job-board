import {
  Typography,
  TypographyStyling,
  TypographyTag,
} from "@/components/base";
import { type ComponentPropsWithoutRef, type FC } from "react";
import { twMerge } from "tailwind-merge";

type Props = {
  title: string;
  titleLevel: TypographyTag;
  titleStyling?: TypographyStyling;
  description?: string;
};

export type TitleDescriptionProps = ComponentPropsWithoutRef<"div"> & Props;

export const TitleDescription: FC<TitleDescriptionProps> = (props) => {
  const {
    title,
    titleStyling = "lg",
    titleLevel,
    description,
    className,
    ...rest
  } = props;

  return (
    <div {...rest} className={twMerge("grid grid-cols-1 gap-1", className)}>
      <Typography tag={titleLevel} weight="medium" styling={titleStyling}>
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
