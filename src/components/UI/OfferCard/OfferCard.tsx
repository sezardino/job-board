import { BaseAvatar } from "@/components/base/Avatar/BaseAvatar";
import { Icon } from "@/components/base/Icon/Icon";
import { Typography } from "@/components/base/Typography/Typography";
import { FileEntity } from "@/types";
import {
  Badge,
  Card,
  CardBody,
  CardFooter,
  CardHeader,
  CardProps,
} from "@nextui-org/react";
import { Salary } from "@prisma/client";
import dayjs from "dayjs";
import { useTranslations } from "next-intl";
import Link from "next/link";
import { type FC } from "react";
import { twMerge } from "tailwind-merge";
import styles from "./OfferCard.module.css";

type Props = {
  id: string;
  name: string;
  companyLogo: FileEntity | null;
  companyName: string;
  skills: { name: string }[];
  salary: Salary;
  linkPrefix: string;
  createdAt: string;
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
    createdAt,
    className,
    ...rest
  } = props;
  const t = useTranslations("components.offer-card");

  const daysAfterPublication = dayjs(createdAt).diff(new Date(), "days") * -1;
  const dateOfPublicationString =
    daysAfterPublication === 0
      ? t("new")
      : t("created-at", { value: daysAfterPublication });

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

          <div className="flex items-center gap-1">
            <Typography tag="p" styling="xs" className="text-teal-400">
              {salary.from} - {salary.to}
            </Typography>
            <Badge size="sm">
              <Typography tag="span" styling="xs">
                {dateOfPublicationString}
              </Typography>
            </Badge>
          </div>
        </CardHeader>

        <CardBody
          className={twMerge(
            styles.body,
            "flex justify-between gap-1 flex-row flex-wrap pt-1"
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
            <ul className="flex flex-wrap gap-0.5 items-center list-none">
              {skills.slice(0, 3).map((skill) => (
                <li key={skill.name}>
                  <Badge color="default" size="sm" className="mr-1">
                    <Typography tag="span" styling="xs">
                      {skill.name}
                    </Typography>
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
