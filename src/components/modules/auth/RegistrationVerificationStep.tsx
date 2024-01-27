import { Grid, Typography } from "@/components/base";
import { Button } from "@nextui-org/react";
import { type ComponentPropsWithoutRef, type FC } from "react";

export interface RegistrationVerificationStepProps
  extends ComponentPropsWithoutRef<"div"> {}

export const RegistrationVerificationStep: FC<
  RegistrationVerificationStepProps
> = (props) => {
  const { className, ...rest } = props;

  return (
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
        {t("success.resend-email.trigger")}
      </Button>

      <Typography tag="p" styling="xs" className="text-center">
        {t("success.resend-email.description")}
      </Typography>
      {!!timeLeft && isTimerActive && (
        <Typography tag="p" styling="xs" className="text-center">
          {t("success.resend-email.interval", { value: timeLeft })}
        </Typography>
      )}
    </Grid>
  );
};
