import { Button, Grid, Icon, Link, Typography } from "@/components/base";
import { BRAND_NAME, PublicPageUrls } from "@/const";
import { getDashboardPath } from "@/utils";
import {
  Navbar,
  NavbarBrand,
  NavbarContent,
  NavbarItem,
  NavbarMenu,
  NavbarMenuItem,
  NavbarMenuToggle,
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@nextui-org/react";
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

type Props = {
  user?: User;
  onSignOutClick: () => void;
};

export type LandingNavbarProps = ComponentPropsWithoutRef<"div"> & Props;

export const LandingNavbar: FC<LandingNavbarProps> = (props) => {
  const { user, onSignOutClick, className, children, ...rest } = props;
  const t = useTranslations("components.landing-navbar");
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const menuItems = useMemo(() => {
    const links: { label: string; href: string }[] = [
      { label: t("home"), href: PublicPageUrls.home },
      { label: t("about"), href: PublicPageUrls.about },
    ];

    if (user?.role)
      links.unshift({
        label: t("dashboard"),
        href: getDashboardPath(user.role),
      });

    return links;
  }, [t, user?.role]);

  const unauthorizedMenuItems = (
    <>
      <NavbarItem>
        <Link as={NextLink} to={PublicPageUrls.login} color="foreground">
          {t("login")}
        </Link>
      </NavbarItem>
      <NavbarItem>
        <Popover offset={10} placement="bottom" backdrop="blur">
          <PopoverTrigger>
            <Button variant="bordered" color="primary">
              {t("register.trigger")}
            </Button>
          </PopoverTrigger>
          <PopoverContent className="w-[240px]">
            {(titleProps) => (
              <Grid gap={4} className="px-1 py-2 w-full">
                <Typography
                  tag="h3"
                  weight="medium"
                  styling="md"
                  className="text-center"
                  {...titleProps}
                >
                  {t("register.title")}
                </Typography>
                <Grid tag="ul" gap={2} className="list-none">
                  <li>
                    <Button
                      as={NextLink}
                      href={PublicPageUrls.registerUser}
                      className="w-full"
                      color="primary"
                      variant="bordered"
                      startContent={<Icon name="HiUser" />}
                    >
                      {t("register.customer")}
                    </Button>
                  </li>
                  <li>
                    <Button
                      as={NextLink}
                      href={PublicPageUrls.registerCompany}
                      className="w-full"
                      variant="bordered"
                      color="primary"
                      startContent={<Icon name="HiBuildingOffice" />}
                    >
                      {t("register.company")}
                    </Button>
                  </li>
                </Grid>
              </Grid>
            )}
          </PopoverContent>
        </Popover>
      </NavbarItem>
    </>
  );

  const avatarLinks = useMemo(() => {
    return [{ onClick: onSignOutClick, label: t("logout") }];
  }, [t, onSignOutClick]);

  return (
    <div
      {...rest}
      className={twMerge(
        "sticky top-0 grid grid-cols-1 gap-3 z-40 w-full h-auto backdrop-blur-lg backdrop-saturate-150 bg-background/70",
        className
      )}
    >
      <div className="container">
        <Navbar
          position="static"
          isBlurred={false}
          className="bg-transparent backdrop-blur-none backdrop-saturate-0"
          onMenuOpenChange={setIsMenuOpen}
        >
          <NavbarContent>
            <NavbarMenuToggle
              aria-label={isMenuOpen ? t("close-menu") : t("open-menu")}
              className="sm:hidden"
            />
            <NavbarBrand>
              <p className="font-bold text-inherit">{BRAND_NAME}</p>
            </NavbarBrand>
          </NavbarContent>

          <NavbarContent className="hidden sm:flex gap-4" justify="center">
            {menuItems.map((item) => (
              <NavbarItem key={item.href}>
                <Link
                  as={NextLink}
                  className="w-full"
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
          <NavbarMenu className="list-none">
            {menuItems.map((item) => (
              <NavbarMenuItem key={item.href}>
                <Link
                  as={NextLink}
                  className="w-full"
                  color="foreground"
                  href={item.href}
                >
                  {item.label}
                </Link>
              </NavbarMenuItem>
            ))}
          </NavbarMenu>
        </Navbar>

        {children}
      </div>
    </div>
  );
};
