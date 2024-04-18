import { Grid, GridProps, GridTags } from "@/components/base/Grid/Grid";
import {
  Typography,
  TypographyStyling,
  TypographyTag,
  TypographyWeight,
} from "@/components/base/Typography/Typography";
import { type FC } from "react";
import { twMerge } from "tailwind-merge";

type Props = {
  title: string;
  titleLevel: TypographyTag;
  titleStyling?: TypographyStyling;
  titleWeight?: TypographyWeight;
  description?: string;
  descriptionStyling?: TypographyStyling;
  isTextCentered?: boolean;
  isTitlePulsed?: boolean;
};

export type TitleDescriptionProps = GridProps<GridTags> & Props;

export const TitleDescription: FC<TitleDescriptionProps> = (props) => {
  const {
    title,
    titleStyling = "lg",
    descriptionStyling = "sm",
    titleWeight = "medium",
    isTitlePulsed,
    titleLevel,
    description,
    isTextCentered,
    gap = 1,
    className,
    ...rest
  } = props;

  return (
    <Grid
      {...rest}
      gap={gap}
      className={twMerge(isTextCentered && "text-center", className)}
    >
      <Typography
        tag={titleLevel}
        weight={titleWeight}
        styling={titleStyling}
        className={twMerge(isTitlePulsed && "animate-pulse")}
      >
        {title}
      </Typography>
      {description && (
        <Typography tag="p" styling={descriptionStyling}>
          {description}
        </Typography>
      )}
    </Grid>
  );
};
