import { Button } from "@/components/base/Button/Button";
import { Grid } from "@/components/base/Grid/Grid";
import { Typography } from "@/components/base/Typography/Typography";
import {
  CommentsForm,
  CommentsFormValues,
} from "@/components/forms/Comments/CommentsForm";
import { ComponentPropsWithoutRef, FC, useId } from "react";

type CommentItem = {
  id: string;
  createdAt: string;
  name: string;
  content: string;
  author: { name: string; avatar: string; email: string };
};

type Props = {
  copy: {
    title: string;
    noData: string;
    new: { title: string; trigger: string } | null;
  };
  isTitleHidden?: boolean;
  comments: CommentItem[];
  isReadOnly?: boolean;
  onCreateComment: (values: CommentsFormValues) => void;
  renderItem: (comment: CommentItem) => JSX.Element;
};

export type CommentsProps = ComponentPropsWithoutRef<"section"> & Props;

export const Comments: FC<CommentsProps> = (props) => {
  const {
    comments,
    isTitleHidden,
    copy,
    isReadOnly = false,
    renderItem,
    onCreateComment,
    ...rest
  } = props;
  const formId = useId();

  return (
    <Grid {...rest} tag="section" gap={4}>
      <Typography tag="h2" styling="lg" isVisuallyHidden={isTitleHidden}>
        {copy.title}
      </Typography>

      {comments.length === 0 && (
        <Typography tag="p" styling="sm">
          {copy.noData}
        </Typography>
      )}

      {!!comments.length && (
        <Grid tag="ul" gap={1}>
          {comments.map((comment) => (
            <li key={comment.id}>{renderItem(comment)}</li>
          ))}
        </Grid>
      )}

      {!isReadOnly && copy.new && (
        <Grid gap={4}>
          <Typography tag="h3" styling="md">
            {copy.new.title}
          </Typography>

          <CommentsForm id={formId} onFormSubmit={onCreateComment} />

          <Button
            form={formId}
            type="submit"
            className="justify-self-end"
            text={copy.new.trigger}
          />
        </Grid>
      )}
    </Grid>
  );
};
