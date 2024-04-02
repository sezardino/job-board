import {
  Checkbox as NextUICheckbox,
  CheckboxProps as NextUICheckboxProps,
} from "@nextui-org/react";
import { ForwardRefRenderFunction, forwardRef, useId } from "react";
import { Typography } from "../Typography/Typography";

type Props = {
  label?: string;
  description?: string;
  error?: string;
};

export type CheckboxProps = NextUICheckboxProps & Props;

const CheckboxComponent: ForwardRefRenderFunction<
  HTMLDivElement,
  CheckboxProps
> = (props, ref) => {
  const { label, description, error, ...rest } = props;
  const errorId = useId();
  const descriptionId = useId();

  return (
    <div ref={ref}>
      <NextUICheckbox
        {...rest}
        aria-describedby={description ? descriptionId : undefined}
        aria-errormessage={error ? errorId : undefined}
      >
        {label && <Typography tag="span">{label}</Typography>}
      </NextUICheckbox>
      {description && (
        <Typography id={descriptionId} tag="p" styling="xs" color="default-500">
          {description}
        </Typography>
      )}
      {error && (
        <Typography id={errorId} tag="p" styling="xs" color="danger">
          {error}
        </Typography>
      )}
    </div>
  );
};

export const Checkbox = forwardRef(CheckboxComponent);
