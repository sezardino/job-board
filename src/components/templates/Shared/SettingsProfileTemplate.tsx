import { TitleDescription } from "@/components/UI/TitleDescription/TitleDescription";
import { Button } from "@/components/base/Button/Button";
import { Grid } from "@/components/base/Grid/Grid";
import { UserProfileForm } from "@/components/forms/UserProfile/UserProfileForm";
import { Card, CardBody, CardFooter, CardHeader } from "@nextui-org/react";
import { useTranslations } from "next-intl";
import { useId } from "react";

export const SettingsProfileTemplate = () => {
  const t = useTranslations("page.shared.settings-profile");
  const formId = useId();

  return (
    <Grid tag="main" gap={4}>
      <TitleDescription
        titleLevel="h1"
        tag="header"
        titleStyling="xl"
        titleWeight="bold"
        title={t("title")}
        description={t("description")}
      />

      <Card>
        <CardHeader>
          <TitleDescription
            titleLevel="h2"
            titleStyling="md"
            title={t("base-data.title")}
            description={t("base-data.description")}
          />
        </CardHeader>
        <CardBody>
          <UserProfileForm
            id={formId}
            initialValues={{
              avatar: null,
              name: "name",
              isAvatarDeleted: false,
            }}
            onFormSubmit={() => undefined}
          />
        </CardBody>
        <CardFooter className="flex gap-2 items-center flex-wrap">
          <Button
            type="reset"
            color="primary"
            variant="bordered"
            form={formId}
            text={t("base-data.cancel")}
          />

          <Button
            type="submit"
            color="primary"
            form={formId}
            text={t("base-data.confirm")}
          />
        </CardFooter>
      </Card>
    </Grid>
  );
};
