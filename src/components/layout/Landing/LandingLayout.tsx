"use client";

import { AvatarDropdown } from "@/components/UI/AvatarDropdown/AvatarDropdown";
import { BRAND_NAME, PublicPageUrls } from "@/const";
import {
  Button,
  Navbar,
  NavbarBrand,
  NavbarContent,
  NavbarItem,
  NavbarMenu,
  NavbarMenuItem,
  NavbarMenuToggle,
} from "@nextui-org/react";
import { useTranslations } from "next-intl";
import Link from "next/link";
import { FC, PropsWithChildren, useMemo, useState } from "react";

import { twMerge } from "tailwind-merge";

type Props = {
  user?: { name?: string | null; email: string; avatar: string | null };
  onSignOutClick: () => void;
};

type LandingWrapperProps = PropsWithChildren<Props>;

export const LandingWrapper: FC<LandingWrapperProps> = (props) => {
  const { user, onSignOutClick, children } = props;
  const t = useTranslations("layout.landing");

  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const menuItems = useMemo(
    () => [
      { label: t("home"), href: PublicPageUrls.home },
      { label: t("about"), href: PublicPageUrls.about },
    ],
    [t]
  );

  const unauthorizedMenuItems = (
    <>
      <NavbarItem>
        <Link href={PublicPageUrls.login}>{t("login")}</Link>
      </NavbarItem>
      <NavbarItem>
        <Button
          as={Link}
          color="primary"
          href={PublicPageUrls.registration}
          variant="flat"
        >
          {t("registration")}
        </Button>
      </NavbarItem>
    </>
  );

  const avatarLinks = useMemo(() => {
    return [{ onClick: onSignOutClick, label: t("logout") }];
  }, [t, onSignOutClick]);

  return (
    <div className={twMerge("min-h-screen antialiased bg-gray-50")}>
      <Navbar onMenuOpenChange={setIsMenuOpen}>
        <NavbarContent>
          <NavbarMenuToggle
            aria-label={isMenuOpen ? "Close menu" : "Open menu"}
            className="sm:hidden"
          />
          <NavbarBrand>
            <p className="font-bold text-inherit">{BRAND_NAME}</p>
          </NavbarBrand>
        </NavbarContent>

        <NavbarContent className="hidden sm:flex gap-4" justify="center">
          {menuItems.map((item) => (
            <NavbarItem key={item.href}>
              <Link className="w-full" href={item.href}>
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
        <NavbarMenu className="list-none">
          {menuItems.map((item) => (
            <NavbarMenuItem key={item.href}>
              <Link className="w-full" href={item.href}>
                {item.label}
              </Link>
            </NavbarMenuItem>
          ))}
        </NavbarMenu>
      </Navbar>

      <div className={twMerge("p-4 h-auto")}>{children}</div>
    </div>
  );
};
