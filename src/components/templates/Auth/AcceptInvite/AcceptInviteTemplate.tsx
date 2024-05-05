"use client";

import { Button } from "@/components/base/Button/Button";
import { Grid } from "@/components/base/Grid/Grid";
import { Icon } from "@/components/base/Icon/Icon";
import { PublicPageUrls } from "@/const";
import { useTranslations } from "next-intl";
import NextLink from "next/link";
import { useCallback, useId, useState, type FC } from "react";

import { TitleDescription } from "@/components/UI/TitleDescription/TitleDescription";
import { Typography } from "@/components/base/Typography/Typography";
import {
  PasswordForm,
  PasswordFormValues,
} from "@/components/forms/Password/PasswordForm";
import { CheckInviteTokenStatus } from "@/services/bll/modules/users/schema";
import { ActionProp } from "@/types";
import styles from "./AcceptInviteTemplate.module.scss";

type Props = {
  errorPayload?: { type: CheckInviteTokenStatus; email?: string };
  acceptInvite: ActionProp<PasswordFormValues, { success: boolean }>;
};

export type AcceptInviteTemplateProps = Props;

export const AcceptInviteTemplate: FC<AcceptInviteTemplateProps> = (props) => {
  const { errorPayload, acceptInvite } = props;

  const [step, setStep] = useState<"success" | null>(null);
  const formId = useId();
  const t = useTranslations("page.shared.accept-invite");

  const acceptInviteHandler = useCallback(
    async (values: PasswordFormValues) => {
      try {
        await acceptInvite.handler(values);
        setStep("success");
      } catch (error) {}
    },
    [acceptInvite]
  );

  return (
    <Grid tag="div" gap={4} className={styles.element}>
      <Button
        as={NextLink}
        href={PublicPageUrls.login}
        variant="light"
        startContent={<Icon name="TbSignLeft" />}
        text={t("login")}
        className={styles.link}
      />
      <Grid gap={5} className={styles.wrapper}>
        {step === null && (
          <>
            {errorPayload && (
              <Grid gap={2}>
                <Icon
                  name="HiMiniXCircle"
                  className="mx-auto text-danger"
                  size={86}
                />
                <Typography tag="h2" styling="lg" isTextCentered>
                  {t(errorPayload.type)}
                </Typography>
              </Grid>
            )}

            {!errorPayload && (
              <>
                <TitleDescription
                  title={t("title")}
                  description={t("description")}
                  titleLevel="h1"
                  titleStyling="xl"
                  descriptionStyling="xs"
                  isTextCentered
                />

                <PasswordForm id={formId} onFormSubmit={acceptInviteHandler} />
                <Button
                  form={formId}
                  type="submit"
                  color="primary"
                  text={t("confirm")}
                />
              </>
            )}
          </>
        )}

        {step === "success" && (
          <TitleDescription
            title={t("success.title")}
            description={t("success.description")}
            titleLevel="h2"
            titleStyling="xl"
            descriptionStyling="sm"
            isTextCentered
          />
        )}
      </Grid>
    </Grid>
  );
};
