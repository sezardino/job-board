import { Badge, Icon, Typography } from "@/components/base";
import { BaseAvatar } from "@/components/base/Avatar/BaseAvatar";
import { FileEntity } from "@/types";
import {
  Card,
  CardBody,
  CardFooter,
  CardHeader,
  CardProps,
} from "@nextui-org/react";
import { Salary } from "@prisma/client";
import { type FC } from "react";
import { twMerge } from "tailwind-merge";

import Link from "next/link";
import styles from "./OfferCard.module.css";

type Props = {
  id: string;
  name: string;
  companyLogo: FileEntity | null;
  companyName: string;
  skills: { name: string }[];
  salary: Salary;
  linkPrefix: string;
};

export type OfferCardProps = CardProps & Props;

export const OfferCard: FC<OfferCardProps> = (props) => {
  const {
    linkPrefix,
    id,
    name,
    companyLogo,
    companyName,
    skills,
    salary,
    className,
    ...rest
  } = props;

  return (
    <Card
      {...rest}
      as="article"
      isPressable
      isHoverable
      className={twMerge("w-full", className)}
    >
      <Link href={`${linkPrefix}/${id}`} className={styles.wrapper}>
        <CardHeader
          className={twMerge(
            styles.head,
            "flex justify-between gap-x-1 gap-y-0 flex-wrap pb-1"
          )}
        >
          <Typography tag="h3" weight="medium" styling="md">
            {name}
          </Typography>

          <Typography tag="p" styling="xs" className="text-teal-400">
            {salary.from} - {salary.to} {salary.currency}
          </Typography>
        </CardHeader>

        <CardBody
          className={twMerge(
            styles.body,
            "flex justify-between gap-1 flex-wrap pt-1"
          )}
        >
          <Typography tag="p" styling="xs">
            <Icon
              name="HiOfficeBuilding"
              size={12}
              color="gray"
              className="inline-block mr-1"
            />
            {companyName}
          </Typography>
          {!!skills.length && (
            <ul className="flex flex-wrap gap-0.5 items-center">
              {skills.slice(0, 3).map((skill) => (
                <li key={skill.name}>
                  <Badge color="primary" size="sm" className="mr-1">
                    <Typography tag="span">{skill.name}</Typography>
                  </Badge>
                </li>
              ))}
            </ul>
          )}
        </CardBody>

        <CardFooter className={twMerge(styles.footer, "pr-0")}>
          <BaseAvatar
            src={props.companyLogo?.url}
            alt={companyName}
            type="image"
            size="lg"
          />
        </CardFooter>
      </Link>
    </Card>
  );
};
