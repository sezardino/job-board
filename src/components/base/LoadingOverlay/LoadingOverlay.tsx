import { Skeleton, Spinner } from "@nextui-org/react";
import { type ComponentPropsWithoutRef, type FC } from "react";
import { twMerge } from "tailwind-merge";

import styles from "./LoadingOverlay.module.scss";

type SkeletonSizes = "sm" | "md" | "lg" | "xl" | "2xl";

export type LoadingOverlayProps = ComponentPropsWithoutRef<"div"> & {
  isInWrapper?: boolean;
  skeletonSize?: SkeletonSizes;
};

export const LoadingOverlay: FC<LoadingOverlayProps> = (props) => {
  const { skeletonSize, isInWrapper = false, className, ...rest } = props;

  return (
    <div
      {...rest}
      className={twMerge(
        styles.element,
        isInWrapper && styles.inWrapper,
        className
      )}
    >
      <div className={styles.wrapper}>
        <Spinner color="secondary" labelColor="foreground" size="lg" />
      </div>
      {skeletonSize && (
        <Skeleton className={styles.skeleton}>
          <div
            className={twMerge(styles.inner, styles[`height-${skeletonSize}`])}
          ></div>
        </Skeleton>
      )}
    </div>
  );
};
