import { Button } from "@/components/base/Button/Button";
import { Grid } from "@/components/base/Grid/Grid";
import { Typography } from "@/components/base/Typography/Typography";
import useTimer from "@/hooks/use-timer";
import { ActionProp } from "@/types";
import { useCallback, type ComponentPropsWithoutRef, type FC } from "react";

type Props = {
  resendEmailAction: ActionProp<any, any>;
  copy: {
    trigger: string;
    description: string;
    interval: string;
  };
};

export type RegistrationVerificationStepProps =
  ComponentPropsWithoutRef<"div"> & Props;

export const RegistrationEmailVerificationStep: FC<
  RegistrationVerificationStepProps
> = (props) => {
  const { resendEmailAction, copy, ...rest } = props;
  const {
    isActive: isTimerActive,
    startTimer,
    left: timeLeft,
  } = useTimer({ initialActive: true });

  const resendHandler = useCallback(async () => {
    if (isTimerActive) return;

    try {
      await resendEmailAction.handler(undefined);
      startTimer();
    } catch (error) {}
  }, [isTimerActive, resendEmailAction, startTimer]);

  return (
    <Grid {...rest} gap={2}>
      <Button
        isDisabled={resendEmailAction.isLoading || isTimerActive}
        isLoading={resendEmailAction.isLoading}
        variant="shadow"
        color="primary"
        className="justify-self-center"
        size="md"
        onClick={resendHandler}
      >
        {copy.trigger}
      </Button>

      <Typography tag="p" styling="xs" className="text-center">
        {copy.description}
      </Typography>
      {!!timeLeft && isTimerActive && (
        <Typography tag="p" styling="xs" className="text-center">
          {`${copy.trigger} ${timeLeft}`}
        </Typography>
      )}
    </Grid>
  );
};
