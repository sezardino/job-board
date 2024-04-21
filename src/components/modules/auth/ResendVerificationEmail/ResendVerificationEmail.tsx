import { Button } from "@/components/base/Button/Button";
import { Grid } from "@/components/base/Grid/Grid";
import { Typography } from "@/components/base/Typography/Typography";
import useTimer from "@/hooks/use-timer";
import { useCallback, type ComponentPropsWithoutRef, type FC } from "react";

import { useTranslations } from "next-intl";
import styles from "./ResendVerificationEmail.module.scss";

type Props = {
  onResendClick: () => Promise<any>;
  isLoading: boolean;
};

export type ResendVerificationEmailProps = ComponentPropsWithoutRef<"div"> &
  Props;

export const ResendVerificationEmail: FC<ResendVerificationEmailProps> = (
  props
) => {
  const { isLoading, onResendClick, ...rest } = props;

  const t = useTranslations("components.shared.resend-verification-email");
  const {
    isActive: isTimerActive,
    startTimer,
    left: timeLeft,
  } = useTimer({ initialActive: true });

  const resendHandler = useCallback(async () => {
    if (isTimerActive) return;

    try {
      await onResendClick();
      startTimer();
    } catch (error) {}
  }, [isTimerActive, onResendClick, startTimer]);

  return (
    <Grid {...rest} gap={2}>
      <Button
        isDisabled={isLoading || isTimerActive}
        isLoading={isLoading}
        variant="shadow"
        color="primary"
        className={styles.trigger}
        size="md"
        onClick={resendHandler}
        text={t("trigger")}
      />

      <Typography tag="p" styling="xs" isTextCentered>
        {t("description")}
      </Typography>
      {!!timeLeft && isTimerActive && (
        <Typography tag="p" styling="xs" isTextCentered>
          {t("interval", { value: timeLeft })}
        </Typography>
      )}
    </Grid>
  );
};
