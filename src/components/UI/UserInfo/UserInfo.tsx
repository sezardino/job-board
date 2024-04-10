import {
  BaseAvatar,
  BaseAvatarSize,
} from "@/components/base/Avatar/BaseAvatar";
import { Typography } from "@/components/base/Typography/Typography";
import { type ComponentPropsWithoutRef, type FC } from "react";
import { twMerge } from "tailwind-merge";

type Props = {
  name?: string;
  email?: string;
  avatar?: string | null;
  size?: BaseAvatarSize;
};

export type UserInfoProps = ComponentPropsWithoutRef<"div"> & Props;

export const UserInfo: FC<UserInfoProps> = (props) => {
  const { name, email, avatar, size = "sm", className, ...rest } = props;

  return (
    <div {...rest} className={twMerge("flex gap-2 items-center", className)}>
      <BaseAvatar
        size={size}
        radius="lg"
        showFallback
        src={avatar || undefined}
        alt={name || ""}
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
