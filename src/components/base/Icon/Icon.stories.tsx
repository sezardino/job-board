import type { Meta, StoryObj } from "@storybook/react";

import { Icon as Component, IconProps as ComponentProps } from "./Icon";

const meta: Meta<ComponentProps> = {
  component: Component,
};

export default meta;
type Story = StoryObj<typeof Component>;

export const Icon: Story = {
  render: (props) => <Component {...props} />,
};
