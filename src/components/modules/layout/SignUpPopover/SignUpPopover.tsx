import { Button } from "@/components/base/Button/Button";
import { Grid } from "@/components/base/Grid/Grid";
import { Icon } from "@/components/base/Icon/Icon";
import { Typography } from "@/components/base/Typography/Typography";
import { PublicPageUrls } from "@/const";
import {
  Link,
  Popover,
  PopoverContent,
  PopoverProps,
  PopoverTrigger,
} from "@nextui-org/react";
import { useTranslations } from "next-intl";

import styles from "./SignUpPopover.module.scss";

import NextLink from "next/link";
import { type FC } from "react";

type Props = {
  text?: string;
  buttonType?: "button" | "link";
};

type OmittedProps = Omit<PopoverProps, "children">;

export type SignUpPopoverProps = OmittedProps & Props;

export const SignUpPopover: FC<SignUpPopoverProps> = (props) => {
  const { text, buttonType = "button", className, ...rest } = props;
  const t = useTranslations("components.shared.sign-up-popover");

  const trigger =
    buttonType === "link" ? (
      <Link color="primary" size="sm">
        {t("trigger")}
      </Link>
    ) : (
      <Button variant="bordered" color="primary" text={t("trigger")} />
    );

  return (
    <Popover placement="bottom" offset={10} {...rest} backdrop="blur">
      <Typography tag="p" isTextCentered>
        {text && <>{text} </>}
        <PopoverTrigger className={styles.trigger}>{trigger}</PopoverTrigger>
      </Typography>
      <PopoverContent className={styles.panel}>
        {(titleProps) => (
          <Grid gap={4} className={styles.wrapper}>
            <Typography
              tag="h3"
              weight="medium"
              styling="md"
              isTextCentered
              {...titleProps}
            >
              {t("title")}
            </Typography>
            <Grid tag="ul" gap={2} className={styles.list}>
              <li>
                <Button
                  as={NextLink}
                  href={PublicPageUrls.registerUser}
                  className={styles.button}
                  color="primary"
                  variant="bordered"
                  startContent={<Icon name="HiUser" />}
                  text={t("customer")}
                />
              </li>
              <li>
                <Button
                  as={NextLink}
                  href={PublicPageUrls.registerCompany}
                  className={styles.button}
                  variant="bordered"
                  color="primary"
                  startContent={<Icon name="HiBuildingOffice" />}
                  text={t("company")}
                />
              </li>
            </Grid>
          </Grid>
        )}
      </PopoverContent>
    </Popover>
  );
};
