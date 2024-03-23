import {
  Grid,
  GridProps,
  GridTags,
  Typography,
  TypographyStyling,
  TypographyTag,
} from "@/components/base";
import { type FC } from "react";
import { twMerge } from "tailwind-merge";

type Props = {
  title: string;
  titleLevel: TypographyTag;
  titleStyling?: TypographyStyling;
  description?: string;
  isTextCentered?: boolean;
};

export type TitleDescriptionProps = GridProps<GridTags> & Props;

export const TitleDescription: FC<TitleDescriptionProps> = (props) => {
  const {
    title,
    titleStyling = "lg",
    titleLevel,
    description,
    isTextCentered,
    className,
    ...rest
  } = props;

  return (
    <Grid
      {...rest}
      gap={1}
      className={twMerge(isTextCentered && "text-center", className)}
    >
      <Typography tag={titleLevel} weight="medium" styling={titleStyling}>
        {title}
      </Typography>
      {description && (
        <Typography tag="p" styling="sm">
          {description}
        </Typography>
      )}
    </Grid>
  );
};
