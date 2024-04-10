import { ComponentPropsWithoutRef, FC, useMemo } from "react";
import { twMerge } from "tailwind-merge";

import { Icon, IconNames } from "@/components/base/Icon/Icon";
import { Typography } from "@/components/base/Typography/Typography";
import {
  JobContract,
  JobOperatingMode,
  JobType,
  Seniority,
} from "@prisma/client";
import { useTranslations } from "next-intl";
import styles from "./OfferBasicData.module.scss";

type Props = {
  type: JobType;
  contract: JobContract[];
  operating: JobOperatingMode[];
  seniority: Seniority;
};

export type OfferBasicDataProps = ComponentPropsWithoutRef<"ul"> & Props;

export const OfferBasicData: FC<OfferBasicDataProps> = (props) => {
  const { type, contract, operating, seniority, className, ...rest } = props;
  const t = useTranslations("components.offer-basic-data");
  const entityT = useTranslations("entity.offers");

  const items = useMemo<
    { label: string; value: string; color: string; icon: IconNames }[]
  >(
    () => [
      {
        label: t("type"),
        value: entityT(`type.${type}`),
        color: "blue",
        icon: "HiBriefcase",
      },
      {
        label: t("contract"),
        value: contract.map((c) => entityT(`contract.${c}`)).join(", "),
        color: "green",
        icon: "HiDocumentText",
      },
      {
        label: t("operating"),
        value: operating.map((o) => entityT(`operating.${o}`)).join(", "),
        color: "orange",
        icon: "HiClock",
      },
      {
        label: t("seniority"),
        value: entityT(`seniority.${seniority}`),
        color: "red",
        icon: "HiUser",
      },
    ],
    [contract, entityT, operating, seniority, t, type]
  );

  return (
    <ul {...rest} className={twMerge(styles.element, className)}>
      {items.map((item) => (
        <li key={item.label} className={styles.item}>
          <Icon name={item.icon} color={item.color} />
          <Typography tag="span" weight="medium" styling="sm">
            {item.label}
          </Typography>
          <Typography tag="span" styling="xs">
            {item.value}
          </Typography>
        </li>
      ))}
    </ul>
  );
};
