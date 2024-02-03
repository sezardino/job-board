import { ComponentPropsWithoutRef, FC } from "react";
import { twMerge } from "tailwind-merge";

export type BaseStepperProps = ComponentPropsWithoutRef<"div"> & {
  count: number;
  currentCount: number;
  onStepClick?: (index: number) => void;
};

export const BaseStepper: FC<BaseStepperProps> = (props) => {
  const { count, currentCount, onStepClick, className, ...rest } = props;

  const Wrapper = onStepClick ? "button" : "p";

  return (
    <div {...rest} className={twMerge("relative", className)}>
      <div
        className={twMerge(
          "absolute left-0 top-2 h-0.5 w-full bg-gray-200",
          "before:left before:absolute before:left-1/3 before:h-full before:w-1/3 before:bg-gradient-to-r before:from-gray-900",
          "after:absolute after:h-full after:w-1/3 after:bg-gray-900"
        )}
        aria-hidden="true"
      />

      <ul className="relative flex w-full justify-between list-none">
        {Array.from({ length: count }).map((_, index) => (
          <li key={index} className="text-left">
            <Wrapper
              className={twMerge(
                "flex h-5 w-5 items-center justify-center rounded-full bg-gray-600 text-xs font-semibold text-white",
                index === currentCount
                  ? "ring ring-gray-600 ring-offset-2"
                  : "",
                index > currentCount ? "bg-gray-300" : ""
              )}
            >
              {index + 1}
            </Wrapper>
          </li>
        ))}
      </ul>
    </div>
  );
};
