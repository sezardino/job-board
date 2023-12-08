import { Typography } from "@/components/base";
import { Avatar } from "@nextui-org/react";
import { type ComponentPropsWithoutRef, type FC } from "react";
import { twMerge } from "tailwind-merge";

type Props = {
  name?: string;
  email?: string;
  avatar?: string;
  size?: "sm" | "md" | "lg";
};

export type UserInfoProps = ComponentPropsWithoutRef<"div"> & Props;

export const UserInfo: FC<UserInfoProps> = (props) => {
  const { name, email, avatar, size = "sm", className, ...rest } = props;

  return (
    <div {...rest} className={twMerge("flex gap-2 items-center", className)}>
      <Avatar
        isBordered
        size={size}
        radius="lg"
        showFallback
        src={avatar}
        alt={name}
      />
      {(name || email) && (
        <div className="flex flex-col gap-1">
          {name && (
            <Typography tag="h2" styling="sm">
              {name}
            </Typography>
          )}
          {email && (
            <Typography tag="p" styling="xs">
              {email}
            </Typography>
          )}
        </div>
      )}
    </div>
  );
};