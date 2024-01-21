import { Button, Grid, Typography } from "@/components/base";
import { VerifyEmailTokenStatus } from "@/services/server/modules/auth/schema";
import { useTranslations } from "next-intl";
import { type ComponentPropsWithoutRef, type FC } from "react";
import { twMerge } from "tailwind-merge";

import { PublicPageUrls } from "@/const";
import NextLink from "next/link";

type Props = {
  status: VerifyEmailTokenStatus;
};

export type VerifyEmailTemplateProps = ComponentPropsWithoutRef<"section"> &
  Props;

export const VerifyEmailTemplate: FC<VerifyEmailTemplateProps> = (props) => {
  const { status, className, ...rest } = props;
  const t = useTranslations("page.verify-email");

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

        {status !== VerifyEmailTokenStatus.NotFound && (
          <Button
            as={NextLink}
            href={PublicPageUrls.login}
            className="mt-5 justify-self-center min-w-[120px]"
            color="primary"
          >
            {t(`${status}.trigger`)}
          </Button>
        )}
      </Grid>
    </Grid>
  );
};
