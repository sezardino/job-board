import { Avatar, AvatarProps } from "@nextui-org/react";
import { type FC } from "react";
import { Icon } from "..";

export type BaseAvatarSize = "sm" | "md" | "lg";

type Props = {
  alt: string;
  size?: BaseAvatarSize;
  type?: "avatar" | "image";
};

export type BaseAvatarProps = AvatarProps & Props;

export const BaseAvatar: FC<BaseAvatarProps> = (props) => {
  const { type = "avatar", alt, size = "sm", ...rest } = props;

  return (
    <Avatar
      {...rest}
      isBordered={type === "avatar"}
      size={size}
      radius={type === "avatar" ? "lg" : undefined}
      showFallback
      fallback={type === "image" ? <Icon name="HiPhotograph" /> : undefined}
    />
  );
};
