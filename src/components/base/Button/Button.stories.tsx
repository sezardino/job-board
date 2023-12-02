import type { Meta, StoryObj } from "@storybook/react";

import { Button as Component } from "./Button";

const meta: Meta<typeof Component> = {
  component: Component,
};

export default meta;
type Story = StoryObj<typeof Component>;

export const Button: Story = {
  render: () => <Component>Button</Component>,
};
