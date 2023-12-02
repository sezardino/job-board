import type { Meta, StoryObj } from "@storybook/react";

import { Input as Component, InputProps as ComponentProps } from "./Input";

const meta: Meta<ComponentProps> = {
  component: Component,
};

export default meta;
type Story = StoryObj<typeof Component>;

export const Input: Story = {
  render: (props) => <Component {...props} />,
};
