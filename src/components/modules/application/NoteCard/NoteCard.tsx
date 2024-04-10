import { UserInfo } from "@/components/UI/UserInfo/UserInfo";
import { Typography } from "@/components/base/Typography/Typography";
import { DEFAULT_DATE_FORMAT } from "@/const";
import {
  Card,
  CardBody,
  CardFooter,
  CardHeader,
  CardProps,
} from "@nextui-org/react";
import dayjs from "dayjs";
import { FC } from "react";
import { twMerge } from "tailwind-merge";

type Props = {
  name: string;
  author: {
    name: string;
    email: string;
    avatar: string | null;
  };
  content: string;
  createdAt: string;
};

export type NoteCardProps = CardProps & Props;

export const NoteCard: FC<NoteCardProps> = (props) => {
  const { name, author, content, createdAt, className, ...rest } = props;

  return (
    <Card {...rest} className={twMerge("border", className)}>
      <CardHeader className="pb-0">
        <Typography tag="h3" styling="md">
          {name}
        </Typography>
      </CardHeader>
      <CardBody>
        <Typography tag="p" styling="sm">
          {content}
        </Typography>
      </CardBody>
      <CardFooter className="pt-0 justify-between">
        <Typography tag="p" styling="xs">
          created - {dayjs(createdAt).format(DEFAULT_DATE_FORMAT)}
        </Typography>
        <UserInfo {...author} />
      </CardFooter>
    </Card>
  );
};
