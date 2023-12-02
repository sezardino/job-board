import { Skeleton, Spinner } from "@nextui-org/react";
import { type ComponentPropsWithoutRef, type FC } from "react";
import { twMerge } from "tailwind-merge";

type SkeletonSizes = "sm" | "md" | "lg" | "xl" | "2xl";

export type LoadingOverlayProps = ComponentPropsWithoutRef<"div"> & {
  isInWrapper?: boolean;
  skeletonSize?: SkeletonSizes;
};

export const LoadingOverlay: FC<LoadingOverlayProps> = (props) => {
  const { skeletonSize, isInWrapper = false, className, ...rest } = props;

  const skeletonSizeToHeight = {
    sm: "h-10",
    md: "h-24",
    lg: "h-45",
    xl: "h-64",
    "2xl": "h-[600px]",
  };

  return (
    <div
      {...rest}
      className={twMerge(
        "top-0 left-0 right-0 bottom-0 z-50",
        isInWrapper ? "absolute" : "fixed",
        className
      )}
    >
      <div className="z-20 absolute top-0 bottom-0 right-0 left-0 flex justify-center items-center backdrop-blur-md backdrop-saturate-150 bg-overlay/30">
        <Spinner color="secondary" labelColor="foreground" size="lg" />
      </div>
      {skeletonSize && (
        <Skeleton className="rounded-lg">
          <div
            className={twMerge(
              skeletonSizeToHeight[skeletonSize],
              "bg-default-300"
            )}
          ></div>
        </Skeleton>
      )}
    </div>
  );
};
