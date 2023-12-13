import { Avatar, AvatarProps } from "@nextui-org/react";
import { type FC } from "react";

export type BaseAvatarSize = "sm" | "md" | "lg";

type Props = {
  alt: string;
  size?: BaseAvatarSize;
};

export type BaseAvatarProps = AvatarProps & Props;

export const BaseAvatar: FC<BaseAvatarProps> = (props) => {
  const { alt, size = "sm", ...rest } = props;

  return <Avatar {...rest} isBordered size={size} radius="lg" showFallback />;
};
