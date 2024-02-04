import { ComponentPropsWithRef, FC, useMemo } from "react";

import "froala-editor/css/froala_editor.pkgd.min.css";
import "froala-editor/css/froala_style.min.css";

// font size
import "froala-editor/js/plugins/font_size.min.js";

// fullscreen
import "froala-editor/js/plugins/fullscreen.min.js";

// line-height
import "froala-editor/js/plugins/line_height.min.js";

// list
import "froala-editor/js/plugins/lists.min.js";

// quote
import "froala-editor/js/plugins/quote.min.js";

// colors
import "froala-editor/js/plugins/colors.min.js";

// align
import "froala-editor/js/plugins/align.min.js";
import "froala-editor/js/plugins/paragraph_format.min.js";

import { Typography } from "@/components/base";
import FroalaEditorComponent, { MyComponentProps } from "react-froala-wysiwyg";
import { twMerge } from "tailwind-merge";

type OmittedProps = Omit<MyComponentProps, "tag" | "config">;

type Props = {
  label?: string;
  placeholder?: string;
  description?: string;
  error?: string;
  onChange: (value: string) => void;
  value: string;
};

export type WysiwygEditorProps = Omit<
  ComponentPropsWithRef<"textarea">,
  "ref" | "onChange"
> &
  OmittedProps &
  Props;

export const WysiwygEditor: FC<WysiwygEditorProps> = (props) => {
  const {
    value,
    onChange,
    label,
    description,
    error,
    placeholder,
    className,
    ...rest
  } = props;

  const config = useMemo(
    () => ({
      placeholderText: placeholder,
      paragraphFormat: {
        N: "Normal",
        H1: "Heading 1",
        H2: "Heading 2",
        H3: "Heading 3",
        H4: "Heading 4",
        PRE: "Code",
      },
    }),
    [placeholder]
  );

  const editor = (
    <FroalaEditorComponent
      {...rest}
      model={value}
      onModelChange={onChange}
      tag="textarea"
      config={config}
    />
  );

  const descriptionString = error ? error : description;

  return (
    <div className={twMerge("grid grid-cols-1 gap-1", className)}>
      {label ? (
        <>
          <Typography tag="span" styling="sm">
            {label}
          </Typography>

          {editor}
        </>
      ) : (
        editor
      )}

      {descriptionString && (
        <Typography
          tag="span"
          styling="xs"
          color={error ? "danger" : undefined}
        >
          {descriptionString}
        </Typography>
      )}
    </div>
  );
};

export default WysiwygEditor;
