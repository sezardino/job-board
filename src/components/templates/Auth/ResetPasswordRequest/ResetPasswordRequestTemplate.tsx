"use client";

import { Button } from "@/components/base/Button/Button";
import { Grid } from "@/components/base/Grid/Grid";
import { Icon } from "@/components/base/Icon/Icon";
import { PublicPageUrls } from "@/const";
import { useTranslations } from "next-intl";
import NextLink from "next/link";
import {
  useCallback,
  useId,
  useRef,
  useState,
  type ComponentPropsWithoutRef,
  type FC,
} from "react";

import { TitleDescription } from "@/components/UI/TitleDescription/TitleDescription";
import { Typography } from "@/components/base/Typography/Typography";
import {
  ResetPasswordForm,
  ResetPasswordFormValues,
} from "@/components/forms/ResetPassword/ResetPasswordForm";
import { ResendVerificationEmail } from "@/components/modules/auth/ResendVerificationEmail/ResendVerificationEmail";
import {
  ResetPasswordRequestError,
  ResetPasswordRequestErrors,
} from "@/services/bll/modules/auth/schema";
import { ActionProp, CustomException } from "@/types";
import { AxiosError } from "axios";
import styles from "./ResetPasswordRequestTemplate.module.scss";

export type ResetPasswordRequestTemplateProps =
  ComponentPropsWithoutRef<"section"> & {
    resetPasswordRequest: ActionProp<
      ResetPasswordFormValues,
      { success: boolean }
    >;
  };

export const ResetPasswordRequestTemplate: FC<
  ResetPasswordRequestTemplateProps
> = (props) => {
  const { resetPasswordRequest, ...rest } = props;
  const submittedEmailRef = useRef<string | null>(null);
  const [success, setSuccess] = useState(false);

  const formId = useId();
  const formRef = useRef<HTMLFormElement | null>(null);
  const t = useTranslations("page.shared.reset-password-request");
  const [error, setError] = useState<string | null>(null);

  const resetPasswordHandler = useCallback(
    async (values: ResetPasswordFormValues) => {
      try {
        const response = await resetPasswordRequest.handler(values);
        submittedEmailRef.current = values.email;
        setSuccess(response.success);
      } catch (error) {
        if (error instanceof AxiosError) {
          const typedError = error as AxiosError<CustomException>;
          console.log(typedError.response?.data.type);
          if (!typedError.response?.data.type) return;

          if (
            ResetPasswordRequestErrors.includes(
              typedError.response?.data.type as ResetPasswordRequestError
            )
          ) {
            setError(typedError.response?.data.type);
          }
        }
      }
    },
    [resetPasswordRequest]
  );

  const resendHandler = useCallback(async () => {
    if (submittedEmailRef.current === null) throw new Error();

    return await resetPasswordRequest.handler({
      email: submittedEmailRef.current,
    });
  }, [resetPasswordRequest]);

  return (
    <Grid tag="div" gap={4} {...rest} className={styles.element}>
      <Button
        as={NextLink}
        href={PublicPageUrls.login}
        variant="light"
        startContent={<Icon name="TbSignLeft" />}
        text={t("login")}
        className={styles.link}
      />
      <Grid gap={5} className={styles.wrapper}>
        {!success && (
          <>
            <TitleDescription
              title={t("title")}
              description={t("description")}
              titleLevel="h1"
              titleStyling="xl"
              descriptionStyling="xs"
              isTextCentered
            />

            {error && (
              <Typography
                tag="span"
                weight="medium"
                styling="base"
                isTextCentered
                color="danger"
                className={styles.error}
              >
                {t(error)}
              </Typography>
            )}

            <ResetPasswordForm
              ref={formRef}
              id={formId}
              onFormSubmit={resetPasswordHandler}
            />
            <Button
              form={formId}
              type="submit"
              color="primary"
              text={t("confirm")}
            />
          </>
        )}
        {success && (
          <ResendVerificationEmail
            onResendClick={resendHandler}
            isLoading={resetPasswordRequest.isLoading}
            className="mt-4"
          />
        )}
      </Grid>
    </Grid>
  );
};
