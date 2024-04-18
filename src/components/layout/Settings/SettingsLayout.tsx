"use client";

import { TitleDescription } from "@/components/UI/TitleDescription/TitleDescription";
import { PublicPageUrls } from "@/const";
import { ScrollShadow } from "@nextui-org/react";
import { useTranslations } from "next-intl";
import Link from "next/link";
import { FC, PropsWithChildren, useMemo } from "react";

import styles from "./SettingsLayout.module.scss";

export const SettingsLayout: FC<PropsWithChildren> = ({ children }) => {
  const t = useTranslations("layout.settings");

  const links = useMemo(
    () => [
      { href: PublicPageUrls.settings, label: t("profile") },
      { href: PublicPageUrls.settingsSecurity, label: t("security") },
      { href: PublicPageUrls.settingsAppearance, label: t("appearance") },
      { href: PublicPageUrls.settingsNotifications, label: t("notifications") },
    ],
    [t]
  );

  return (
    <div className={styles.element}>
      <TitleDescription
        tag="header"
        title={t("title")}
        description={t("description")}
        titleLevel="h1"
        className={styles.header}
      />
      <div className={styles.wrapper}>
        <ScrollShadow as="nav" orientation="horizontal" className={styles.nav}>
          {links.map((link) => (
            <Link key={link.href} className={styles.link} href={link.href}>
              {link.label}
            </Link>
          ))}
        </ScrollShadow>
        <main className={styles.content}>{children}</main>
      </div>
    </div>
  );
};
