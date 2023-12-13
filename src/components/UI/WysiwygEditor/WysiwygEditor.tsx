import { ComponentPropsWithRef, FC, useMemo } from "react";

import "froala-editor/css/froala_editor.pkgd.min.css";
import "froala-editor/css/froala_style.min.css";

// import "froala-editor/css/plugins/draggable.min.css";
// import "froala-editor/js/plugins/font_size.min.js";

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

import FroalaEditorComponent, { MyComponentProps } from "react-froala-wysiwyg";

type OmittedProps = Omit<MyComponentProps, "tag" | "config">;

export type WysiwygEditorProps = Omit<
  ComponentPropsWithRef<"textarea">,
  "ref"
> &
  OmittedProps;

export const WysiwygEditor: FC<WysiwygEditorProps> = (props) => {
  const { placeholder, ...rest } = props;

  const config = useMemo(
    () => ({
      placeholderText: placeholder,
    }),
    [placeholder]
  );

  return <FroalaEditorComponent {...rest} tag="textarea" config={config} />;
};
