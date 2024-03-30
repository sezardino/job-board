import { Icon, IconNames } from "@/components/base/Icon/Icon";
import { Card, CardBody, CardProps } from "@nextui-org/react";
import { FC } from "react";
import { TitleDescription } from "../TitleDescription/TitleDescription";

import styles from "./NoDataCard.module.scss";

type Props = {
  title: string;
  description: string;
  icon?: IconNames;
};

export type NoDataCardProps = CardProps & Props;

export const NoDataCard: FC<NoDataCardProps> = (props) => {
  const { icon = "HiOutlineSearch", title, description, ...rest } = props;

  return (
    <Card {...rest}>
      <CardBody className={styles.body}>
        <Icon name={icon} size={64} className="text-primary" />
        <TitleDescription
          title={title}
          titleLevel="h3"
          titleStyling="xl"
          descriptionStyling="md"
          description={description}
          isTextCentered
        />
      </CardBody>
    </Card>
  );
};
