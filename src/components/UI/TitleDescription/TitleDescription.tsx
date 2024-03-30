import { Grid, GridProps, GridTags } from "@/components/base/Grid/Grid";
import {
  Typography,
  TypographyStyling,
  TypographyTag,
} from "@/components/base/Typography/Typography";
import { type FC } from "react";
import { twMerge } from "tailwind-merge";

type Props = {
  title: string;
  titleLevel: TypographyTag;
  titleStyling?: TypographyStyling;
  description?: string;
  descriptionStyling?: TypographyStyling;
  isTextCentered?: boolean;
};

export type TitleDescriptionProps = GridProps<GridTags> & Props;

export const TitleDescription: FC<TitleDescriptionProps> = (props) => {
  const {
    title,
    titleStyling = "lg",
    descriptionStyling = "sm",
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
        <Typography tag="p" styling={descriptionStyling}>
          {description}
        </Typography>
      )}
    </Grid>
  );
};
