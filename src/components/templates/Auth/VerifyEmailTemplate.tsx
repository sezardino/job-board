import { Button, Grid, Typography } from "@/components/base";
import {
  ResendVerificationEmailResponse,
  VerifyEmailTokenStatus,
} from "@/services/server/modules/auth/schema";
import { useTranslations } from "next-intl";
import { useCallback, type ComponentPropsWithoutRef, type FC } from "react";
import { twMerge } from "tailwind-merge";

import { PublicPageUrls } from "@/const";
import useTimer from "@/hooks/use-timer";
import { ActionProp } from "@/types";
import NextLink from "next/link";

type Props = {
  status: VerifyEmailTokenStatus;
  resendEmailAction: ActionProp<
    any,
    ResendVerificationEmailResponse | undefined
  >;
};

export type VerifyEmailTemplateProps = ComponentPropsWithoutRef<"section"> &
  Props;

export const VerifyEmailTemplate: FC<VerifyEmailTemplateProps> = (props) => {
  const { resendEmailAction, status, className, ...rest } = props;
  const t = useTranslations("page.verify-email");

  const { isActive: isTimerActive, startTimer, left: timeLeft } = useTimer({});

  const resendHandler = useCallback(async () => {
    if (isTimerActive) return;

    try {
      await resendEmailAction.handler(undefined);
      startTimer();
    } catch (error) {}
  }, [isTimerActive, resendEmailAction, startTimer]);

  return (
    <Grid
      {...rest}
      tag="section"
      className={twMerge("w-full max-w-lg mx-auto py-10", className)}
    >
      <Grid
        gap={2}
        className="px-4 py-6 sm:px-6  sm:py-10 border-2 rounded-2xl"
      >
        <Typography
          tag="h2"
          color={
            status === VerifyEmailTokenStatus.Success ? "primary" : "danger"
          }
          styling="xl"
          weight="bold"
          className="text-center"
        >
          {t(`${status}.title`)}
        </Typography>
        <Typography tag="p" styling="sm" className="text-center">
          {t(`${status}.description`)}
        </Typography>

        {![
          VerifyEmailTokenStatus.NotFound,
          VerifyEmailTokenStatus.Expired,
        ].includes(status) && (
          <Button
            as={NextLink}
            href={PublicPageUrls.login}
            className="mt-4 justify-self-center min-w-[120px]"
            color="primary"
          >
            {t(`${status}.trigger`)}
          </Button>
        )}

        {status === VerifyEmailTokenStatus.Expired && (
          <Grid gap={2} className="mt-4">
            <Button
              isDisabled={resendEmailAction.isLoading || isTimerActive}
              isLoading={resendEmailAction.isLoading}
              variant="shadow"
              color="primary"
              className="justify-self-center"
              size="md"
              onClick={resendHandler}
            >
              {t("expired.trigger")}
            </Button>

            {!!timeLeft && isTimerActive && (
              <Typography tag="p" styling="xs" className="text-center">
                {t("expired.interval", { value: timeLeft })}
              </Typography>
            )}
          </Grid>
        )}
      </Grid>
    </Grid>
  );
};
