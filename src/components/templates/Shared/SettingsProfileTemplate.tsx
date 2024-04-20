import { ConfirmModal } from "@/components/UI/ConformModal/ConfirmModal";
import { TitleDescription } from "@/components/UI/TitleDescription/TitleDescription";
import { Button } from "@/components/base/Button/Button";
import { Grid } from "@/components/base/Grid/Grid";
import {
  UserProfileForm,
  UserProfileFormValues,
} from "@/components/forms/UserProfile/UserProfileForm";
import { Profile } from "@/context";
import { ActionProp } from "@/types";
import {
  Card,
  CardBody,
  CardFooter,
  CardHeader,
  Skeleton,
} from "@nextui-org/react";
import { useTranslations } from "next-intl";
import { FC, useCallback, useId, useState } from "react";

type SettingsProfileTemplateProps = {
  profile: { profile: Profile | null; isFetching: boolean };
  editProfileAction: ActionProp<UserProfileFormValues>;
};

export const SettingsProfileTemplate: FC<SettingsProfileTemplateProps> = (
  props
) => {
  const { profile, editProfileAction } = props;

  const t = useTranslations("page.shared.settings-profile");
  const formId = useId();
  const [profileToEdit, setProfileToEdit] =
    useState<UserProfileFormValues | null>();

  const handleEditProfile = useCallback(async () => {
    if (!profileToEdit) return;

    try {
      await editProfileAction.handler(profileToEdit);

      setProfileToEdit(null);
    } catch (error) {}
  }, [editProfileAction, profileToEdit]);

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
              title={t("base-data.title")}
              description={t("base-data.description")}
            />
          </CardHeader>

          <Skeleton as={CardBody} isLoaded={!profile.isFetching}>
            <UserProfileForm
              key={`${profile.profile?.avatar}-${profile.profile?.name}`}
              id={formId}
              initialValues={{
                avatar: profile.profile?.avatar || "",
                name: profile.profile?.name || "",
              }}
              onFormSubmit={(values) => setProfileToEdit(values)}
            />
          </Skeleton>
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

      <ConfirmModal
        isOpen={!!profileToEdit}
        placement="center"
        onClose={() => setProfileToEdit(null)}
        title={t("modals.edit-profile.title")}
        description={t("modals.edit-profile.description")}
        buttons={[
          {
            text: t("modals.edit-profile.cancel"),
            variant: "bordered",
            onClick: () => setProfileToEdit(null),
          },
          {
            text: t("modals.edit-profile.confirm"),
            onClick: handleEditProfile,
          },
        ]}
      />
    </>
  );
};
