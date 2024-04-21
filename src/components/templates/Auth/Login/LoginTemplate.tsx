"use client";

import { Button } from "@/components/base/Button/Button";
import { Grid } from "@/components/base/Grid/Grid";
import { Icon } from "@/components/base/Icon/Icon";
import { PublicPageUrls } from "@/const";
import { useTranslations } from "next-intl";
import NextLink from "next/link";
import { type ComponentPropsWithoutRef, type FC } from "react";
import { Typography } from "../../../base/Typography/Typography";
import { AuthFormProps } from "../../../forms";
import { LoginForm } from "../../../forms/Login/LoginForm";
import { SignUpPopover } from "../../../modules/layout/SignUpPopover/SignUpPopover";

import { TitleDescription } from "@/components/UI/TitleDescription/TitleDescription";
import { Link } from "@nextui-org/react";
import styles from "./LoginTemplate.module.scss";

export type LoginTemplateProps = ComponentPropsWithoutRef<"section"> & {
  onFormSubmit: AuthFormProps["onFormSubmit"];
};

export const LoginTemplate: FC<LoginTemplateProps> = (props) => {
  const { onFormSubmit, ...rest } = props;
  const t = useTranslations("page.shared.login");

  return (
    <Grid tag="div" gap={4} {...rest} className={styles.element}>
      <Button
        as={NextLink}
        href={PublicPageUrls.home}
        variant="light"
        startContent={<Icon name="TbSignLeft" />}
        text={t("home")}
        className={styles.home}
      />
      <Grid gap={5} className={styles.wrapper}>
        <TitleDescription
          title={t("title")}
          description={t("description")}
          titleLevel="h1"
          titleStyling="xl"
          descriptionStyling="xs"
          isTextCentered
        />

        <LoginForm onFormSubmit={onFormSubmit} />

        <div>
          <Typography tag="p" isTextCentered>
            {t("forgot-password.title")}{" "}
            <Link as={NextLink} size="sm" href={PublicPageUrls.resetPassword}>
              {t("forgot-password.trigger")}
            </Link>
          </Typography>

          <SignUpPopover text={t("register.text")} buttonType="link" />
        </div>
      </Grid>
    </Grid>
  );
};
