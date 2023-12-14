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

import FroalaEditorComponent, { MyComponentProps } from "react-froala-wysiwyg";

type OmittedProps = Omit<MyComponentProps, "tag" | "config">;

type Props = {
  onModelChange: (value: string) => void;
};

export type WysiwygEditorProps = Omit<
  ComponentPropsWithRef<"textarea">,
  "ref"
> &
  OmittedProps &
  Props;

export const WysiwygEditor: FC<WysiwygEditorProps> = (props) => {
  const { placeholder, ...rest } = props;

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

  return <FroalaEditorComponent {...rest} tag="textarea" config={config} />;
};

export default WysiwygEditor;
