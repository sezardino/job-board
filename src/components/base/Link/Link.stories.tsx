import type { Meta, StoryObj } from "@storybook/react";

import { Link as Component, LinkProps as ComponentProps } from "./Link";

const meta: Meta<ComponentProps> = {
  // @ts-ignore
  component: Component,
};

export default meta;
type Story = StoryObj<typeof Component>;

export const Link: Story = {
  render: () => (
    <Component>
      <span>1</span>
      <span>2</span>
      <span>3</span>
      <span>4</span>
    </Component>
  ),
};
