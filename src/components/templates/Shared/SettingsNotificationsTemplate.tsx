import { TitleDescription } from "@/components/UI/TitleDescription/TitleDescription";
import { useTranslations } from "next-intl";

export const SettingsNotificationsTemplate = () => {
  const t = useTranslations("page.shared.settings-notifications");

  return (
    <TitleDescription
      titleLevel="h2"
      tag="section"
      titleStyling="2xl"
      gap={4}
      titleWeight="bold"
      isTextCentered
      descriptionStyling="md"
      isTitlePulsed
      title={t("title")}
      description={t("description")}
      className="my-5"
    />
  );
};
