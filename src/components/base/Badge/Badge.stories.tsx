import type { Meta, StoryObj } from "@storybook/react";

import { Badge as Component, BadgeProps as ComponentProps } from "./Badge";

const meta: Meta<ComponentProps> = {
  component: Component,
};

export default meta;
type Story = StoryObj<typeof Component>;

export const Badge: Story = {
  render: () => <Component>Badge</Component>,
};
