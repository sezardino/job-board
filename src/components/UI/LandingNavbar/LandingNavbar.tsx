"use client";

import { SignUpPopover } from "@/components/modules/layout/SignUpPopover";
import { BRAND_NAME, PublicPageUrls } from "@/const";
import { getDashboardPath } from "@/utils";
import {
  Link,
  Navbar,
  NavbarBrand,
  NavbarContent,
  NavbarItem,
  NavbarMenu,
  NavbarMenuItem,
  NavbarMenuToggle,
} from "@nextui-org/react";
import { UserRoles } from "@prisma/client";
import { User } from "next-auth";
import { useTranslations } from "next-intl";
import NextLink from "next/link";
import {
  useMemo,
  useState,
  type ComponentPropsWithoutRef,
  type FC,
} from "react";
import { twMerge } from "tailwind-merge";
import { AvatarDropdown } from "../AvatarDropdown/AvatarDropdown";

import styles from "./LandingNavbar.module.scss";

type Props = {
  user?: User;
  onSignOutClick: () => void;
};

export type LandingNavbarProps = ComponentPropsWithoutRef<"div"> & Props;

export const LandingNavbar: FC<LandingNavbarProps> = (props) => {
  const { user, onSignOutClick, className, children, ...rest } = props;
  const t = useTranslations("components.shared.navbar");
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const menuItems = useMemo(() => {
    const links: { label: string; href: string }[] = [
      { label: t("home"), href: PublicPageUrls.home },
      { label: t("about"), href: PublicPageUrls.about },
    ];

    if (user?.role && user.role !== UserRoles.CUSTOMER)
      links.unshift({
        label: t("dashboard"),
        href: getDashboardPath(user.role),
      });

    return links;
  }, [t, user?.role]);

  const unauthorizedMenuItems = (
    <>
      <NavbarItem>
        <Link as={NextLink} href={PublicPageUrls.login} color="foreground">
          {t("login")}
        </Link>
      </NavbarItem>
      <NavbarItem as={SignUpPopover} />
    </>
  );

  const avatarLinks = useMemo(() => {
    const links: { onClick?: () => void; href?: string; label: string }[] = [];

    const logoutLink = { onClick: onSignOutClick, label: t("logout") };
    const profileLink = { href: PublicPageUrls.profile, label: t("profile") };
    const settingsLink = {
      href: PublicPageUrls.settings,
      label: t("settings"),
    };

    if (user?.role === UserRoles.CUSTOMER) links.push(profileLink);

    links.push(settingsLink, logoutLink);
    return links;
  }, [onSignOutClick, t, user?.role]);

  return (
    <div {...rest} className={twMerge(styles.element, className)}>
      <Navbar
        position="static"
        isBlurred={false}
        className={styles.navbar}
        onMenuOpenChange={setIsMenuOpen}
      >
        <NavbarContent>
          <NavbarMenuToggle
            aria-label={isMenuOpen ? t("close-menu") : t("open-menu")}
            className={styles.hamburger}
          />
          <NavbarBrand>
            <p className={styles.brand}>{BRAND_NAME}</p>
          </NavbarBrand>
        </NavbarContent>

        <NavbarContent className={styles.content} justify="center">
          {menuItems.map((item) => (
            <NavbarItem key={item.href}>
              <Link
                as={NextLink}
                className={styles.link}
                color="foreground"
                href={item.href}
              >
                {item.label}
              </Link>
            </NavbarItem>
          ))}
        </NavbarContent>
        <NavbarContent justify="end">
          {!user && unauthorizedMenuItems}
          {user && (
            <AvatarDropdown
              user={user}
              title={t("user-menu-title")}
              items={avatarLinks}
            />
          )}
        </NavbarContent>
        <NavbarMenu className={styles.list}>
          {menuItems.map((item) => (
            <NavbarMenuItem key={item.href}>
              <Link
                as={NextLink}
                className={styles.link}
                color="foreground"
                href={item.href}
              >
                {item.label}
              </Link>
            </NavbarMenuItem>
          ))}
        </NavbarMenu>
      </Navbar>

      {children && <div className={styles.content}>{children}</div>}
    </div>
  );
};
