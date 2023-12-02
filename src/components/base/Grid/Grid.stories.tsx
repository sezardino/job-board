import type { Meta, StoryObj } from "@storybook/react";

import { Grid as Component, GridProps as ComponentProps } from "./Grid";

const meta: Meta<ComponentProps<"div">> = {
  // @ts-ignore
  component: Component,
};

export default meta;
type Story = StoryObj<typeof Component>;

export const Grid: Story = {
  render: () => (
    <Component tag="div" col={2} gap={2}>
      <span>1</span>
      <span>2</span>
      <span>3</span>
      <span>4</span>
    </Component>
  ),
};
