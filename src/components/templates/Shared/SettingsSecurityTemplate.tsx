import { ConfirmModal } from "@/components/UI/ConformModal/ConfirmModal";
import { TitleDescription } from "@/components/UI/TitleDescription/TitleDescription";
import { Button } from "@/components/base/Button/Button";
import { Grid } from "@/components/base/Grid/Grid";
import {
  PasswordForm,
  PasswordFormValues,
} from "@/components/forms/Password/PasswordForm";
import { ActionProp } from "@/types";
import { Card, CardBody, CardFooter, CardHeader } from "@nextui-org/react";
import { useTranslations } from "next-intl";
import { FC, useCallback, useId, useRef, useState } from "react";

type SettingsSecurityTemplateProps = {
  changePasswordAction: ActionProp<PasswordFormValues>;
};

export const SettingsSecurityTemplate: FC<SettingsSecurityTemplateProps> = (
  props
) => {
  const { changePasswordAction } = props;

  const t = useTranslations("page.shared.settings-security");
  const formId = useId();
  const formRef = useRef<HTMLFormElement>(null);
  const [passwordToChangeData, setPasswordToChangeData] =
    useState<PasswordFormValues | null>(null);

  const changePasswordHandler = useCallback(async () => {
    if (!passwordToChangeData) return;

    try {
      await changePasswordAction.handler(passwordToChangeData);

      setPasswordToChangeData(null);
      formRef.current?.reset();
    } catch (error) {}
  }, [changePasswordAction, passwordToChangeData]);

  return (
    <>
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
              title={t("change-password.title")}
              description={t("change-password.description")}
            />
          </CardHeader>

          <CardBody>
            <PasswordForm
              ref={formRef}
              id={formId}
              withOldPassword
              onFormSubmit={setPasswordToChangeData}
            />
          </CardBody>
          <CardFooter className="flex gap-2 items-center flex-wrap">
            <Button
              type="reset"
              color="primary"
              variant="bordered"
              form={formId}
              text={t("change-password.cancel")}
            />

            <Button
              type="submit"
              color="primary"
              form={formId}
              text={t("change-password.confirm")}
            />
          </CardFooter>
        </Card>
      </Grid>

      <ConfirmModal
        isOpen={!!passwordToChangeData}
        placement="center"
        onClose={() => setPasswordToChangeData(null)}
        title={t("modals.change-password.title")}
        description={t("modals.change-password.description")}
        buttons={[
          {
            text: t("modals.change-password.cancel"),
            variant: "bordered",
            onClick: () => setPasswordToChangeData(null),
          },
          {
            text: t("modals.change-password.confirm"),
            onClick: changePasswordHandler,
          },
        ]}
      />
    </>
  );
};
