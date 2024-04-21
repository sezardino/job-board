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
import { ResendVerificationEmail } from "@/components/modules/auth/ResendVerificationEmail/ResendVerificationEmail";
import {
  ResetPasswordRequestDto,
  VerifyResetPasswordTokenErrors,
} from "@/services/bll/modules/auth/schema";
import { ActionProp } from "@/types";
import styles from "./ResetPasswordTemplate.module.scss";

type Props = {
  errorPayload?: { type: VerifyResetPasswordTokenErrors; email?: string };
  resendVerificationEmail: ActionProp<
    ResetPasswordRequestDto,
    { success: boolean }
  >;
  resetPassword: ActionProp<PasswordFormValues, { success: boolean }>;
};

export type ResetPasswordTemplateProps = Props;

export const ResetPasswordTemplate: FC<ResetPasswordTemplateProps> = (
  props
) => {
  const { errorPayload, resendVerificationEmail, resetPassword } = props;

  const [step, setStep] = useState<"resend" | "success" | null>(null);
  const formId = useId();
  const t = useTranslations("page.shared.reset-password");

  const resendVerificationEmailHandler = useCallback(async () => {
    if (errorPayload?.type !== VerifyResetPasswordTokenErrors.TokenExpired)
      return;
    if (!errorPayload.email) return;
    try {
      await resendVerificationEmail.handler({ email: errorPayload.email });
      setStep("resend");
    } catch (error) {}
  }, [errorPayload?.email, errorPayload?.type, resendVerificationEmail]);

  const resetPasswordHandler = useCallback(
    async (values: PasswordFormValues) => {
      try {
        await resetPassword.handler(values);
        setStep("success");
      } catch (error) {}
    },
    [resetPassword]
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

                {errorPayload?.type ===
                  VerifyResetPasswordTokenErrors.TokenExpired && (
                  <Button
                    text={t("resend")}
                    color="primary"
                    variant="bordered"
                    className={styles.resend}
                    onClick={resendVerificationEmailHandler}
                  />
                )}
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

                <PasswordForm id={formId} onFormSubmit={resetPasswordHandler} />
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

        {step === "resend" && (
          <ResendVerificationEmail
            isLoading={resendVerificationEmail.isLoading}
            onResend={resendVerificationEmailHandler}
          />
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
