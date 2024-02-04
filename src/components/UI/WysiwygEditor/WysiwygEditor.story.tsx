import type { Meta, StoryObj } from "@storybook/react";

import { useState } from "react";
import { WysiwygEditor as Component } from "./WysiwygEditor";

const meta: Meta<typeof Component> = {
  component: Component,
};

export default meta;
type Story = StoryObj<typeof Component>;

const Render = () => {
  const [model, setModel] = useState("");

  return (
    <>
      <Component value={model} onChange={setModel} />
      {/* @ts-ignore */}
      <pre dangerouslySetInnerHTML={model}></pre>
    </>
  );
};

export const TableWidget: Story = {
  render: Render,
};
