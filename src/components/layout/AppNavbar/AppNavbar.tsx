"use client";

import { useMemo, type ComponentPropsWithoutRef, type FC } from "react";

import {
  Avatar,
  Dropdown,
  DropdownItem,
  DropdownMenu,
  DropdownTrigger,
} from "@nextui-org/react";
import { twMerge } from "tailwind-merge";

type CopyProp = {
  userMenu: string;
  logout: string;
};

export type AppNavbarProps = ComponentPropsWithoutRef<"nav"> & {
  avatarSrc?: string;
  login: string;
  onSignOutClick: () => void;
  copy: CopyProp;
  dropdownLinks?: { href?: string; label: string; onClick?: () => void }[];
};

export const AppNavbar: FC<AppNavbarProps> = (props) => {
  const {
    dropdownLinks = [],
    onSignOutClick,
    copy,
    avatarSrc,
    login,
    className,
    ...rest
  } = props;

  const avatarLinks = useMemo(() => {
    return [...dropdownLinks, { onClick: onSignOutClick, label: copy.logout }];
  }, [dropdownLinks]);

  return (
    <nav {...rest} className={twMerge("bg-gray-50 border-b", className)}>
      <div className="mx-auto max-w-7xl px-2 sm:px-6 lg:px-8 relative flex h-16 items-center justify-end">
        <Dropdown>
          <DropdownTrigger>
            <button>
              <span className="sr-only">{copy.userMenu}</span>
              <Avatar
                src={avatarSrc}
                radius="full"
                name={login?.slice(0, 1).toUpperCase()}
                className="text-xl"
              />
            </button>
          </DropdownTrigger>
          <DropdownMenu aria-label="Avatar menu">
            {avatarLinks.map(({ href, onClick, label }) => (
              <DropdownItem
                key={href}
                as={href ? "a" : "button"}
                href={href}
                onClick={onClick}
              >
                {label}
              </DropdownItem>
            ))}
          </DropdownMenu>
        </Dropdown>
      </div>
    </nav>
  );
};
