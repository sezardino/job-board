import { ComponentPropsWithoutRef, FC } from "react";
import { twMerge } from "tailwind-merge";

export type StepperProps = ComponentPropsWithoutRef<"div"> & {
  count: number;
  filledCount: number;
  currentCount: number;
  onStepClick?: (index: number) => void;
};

export const Stepper: FC<StepperProps> = (props) => {
  const { count, currentCount, filledCount, onStepClick, className, ...rest } =
    props;

  const Wrapper = onStepClick ? "button" : "p";
  const progress = (currentCount / count) * 100;
  {
  }
  return (
    <div {...rest} className={twMerge("w-full relative", className)}>
      <div
        className={twMerge(
          "absolute left-0 top-2 h-0.5 w-full bg-gray-200",
          `before:left before:absolute before:left-[${progress}] before:h-full before:w-[${progress}] before:bg-gradient-to-r before:from-gray-900`,
          `after:absolute after:h-full after:w-[${progress}] after:bg-gray-900`
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
                index > filledCount ? "bg-gray-300" : ""
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
