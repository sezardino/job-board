import { TitleDescription } from "@/components/UI/TitleDescription/TitleDescription";
import { Button } from "@/components/base/Button/Button";
import { UserProfileForm } from "@/components/forms/UserProfile/UserProfileForm";
import { useTranslations } from "next-intl";
import { useId } from "react";

export const SettingsProfileTemplate = () => {
  const t = useTranslations("page.shared.settings-profile");
  const formId = useId();

  return (
    <main>
      <TitleDescription
        titleLevel="h1"
        tag="header"
        titleStyling="xl"
        gap={4}
        titleWeight="bold"
        descriptionStyling="md"
        title={t("title")}
        description={t("description")}
      />

      <section>
        <TitleDescription
          titleLevel="h2"
          title={t("base-data.title")}
          description={t("base-data.description")}
        />
        <UserProfileForm
          id={formId}
          initialValues={{ avatar: null, name: "name", isAvatarDeleted: false }}
          onFormSubmit={() => undefined}
        />
        <div className="mt-4 flex gap-2 items-center flex-wrap">
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
        </div>
      </section>
    </main>
  );
};
