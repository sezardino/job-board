import { Grid, Link, Typography } from "@/components/base";
import { UserRegistrationForm } from "@/components/forms/UserRegistration/UserRegistrationForm";
import { PublicPageUrls } from "@/const";
import { useTranslations } from "next-intl";
import NextLink from "next/link";
import { type ComponentPropsWithoutRef, type FC } from "react";
import { twMerge } from "tailwind-merge";

export interface UserRegistrationTemplateProps
  extends ComponentPropsWithoutRef<"div"> {}

export const UserRegistrationTemplate: FC<UserRegistrationTemplateProps> = (
  props
) => {
  const { className, ...rest } = props;
  const t = useTranslations("page.user-registration");

  return (
    <Grid
      {...rest}
      gap={10}
      tag="section"
      className={twMerge("w-full max-w-lg mx-auto py-10", className)}
    >
      <Typography tag="h1" styling="xl" className="text-center">
        {t("title")}
      </Typography>
      <UserRegistrationForm
        onEmailAvailableRequest={async () => true}
        onFormSubmit={() => undefined}
        className="px-4 py-6 sm:px-6  sm:py-10 border-2 rounded-2xl"
      />
      <Typography tag="p" styling="sm" className="text-center">
        {t("login.description")}{" "}
        <Link as={NextLink} to={PublicPageUrls.login} color="primary">
          {t("login.link")}
        </Link>
      </Typography>
    </Grid>
  );
};
