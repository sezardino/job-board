import { Card, CardProps } from "@nextui-org/react";
import Image from "next/image";
import { FC } from "react";
import { twMerge } from "tailwind-merge";

type Props = {
  size?: "sm" | "md" | "lg";
  image?: {
    url: string;
    name: string;
  };
};

export type ImageCardProps = Omit<CardProps, "isBlurred"> & Props;

export const ImageCard: FC<ImageCardProps> = (props) => {
  const { size = "sm", image, children, className, ...rest } = props;

  const sizes = {
    sm: "w-28 h-28",
    md: "w-36 h-36",
    lg: "w-48 h-48",
  };

  return (
    <Card
      {...rest}
      isBlurred
      className={twMerge(
        "flex justify-center items-center text-center",
        sizes[size],
        className
      )}
    >
      {image && <Image src={image.url} fill alt={image.name} />}
      {children && children}
    </Card>
  );
};
