import { Profile } from "@/context";
import {
  Avatar,
  Dropdown,
  DropdownItem,
  DropdownMenu,
  DropdownTrigger,
} from "@nextui-org/react";
import Link from "next/link";
import { type ComponentPropsWithoutRef, type FC } from "react";

type Props = {
  title: string;
  items: { href?: string; label: string; onClick?: () => void }[];
  user: Profile;
};

export type AvatarDropdownProps = ComponentPropsWithoutRef<"div"> & Props;

export const AvatarDropdown: FC<AvatarDropdownProps> = (props) => {
  const { items, user, title, ...rest } = props;

  return (
    <Dropdown {...rest}>
      <DropdownTrigger>
        <button>
          <span className="sr-only">{title}</span>
          <Avatar
            src={user.avatar || undefined}
            radius="full"
            name={(user.name || user.email).slice(0, 1).toUpperCase()}
            className="text-xl"
          />
        </button>
      </DropdownTrigger>
      <DropdownMenu aria-label="Avatar menu">
        {items.map(({ href, onClick, label }, index) => (
          <DropdownItem
            key={`${href}/${index}`}
            as={href ? Link : "button"}
            href={href}
            className="text-left"
            onClick={onClick}
          >
            {label}
          </DropdownItem>
        ))}
      </DropdownMenu>
    </Dropdown>
  );
};
