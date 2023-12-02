import type { Meta, StoryObj } from "@storybook/react";

import { Button as Component, ButtonProps as ComponentProps } from "./Button";

const meta: Meta<ComponentProps> = {
  component: Component,
};

export default meta;
type Story = StoryObj<typeof Component>;

export const Button: Story = {
  render: () => <Component>Button</Component>,
};
