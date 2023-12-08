import type { Meta, StoryObj } from "@storybook/react";

import { UserInfo as Component } from "./UserInfo";

const meta: Meta<typeof Component> = {
  component: Component,
};

export default meta;
type Story = StoryObj<typeof Component>;

export const UserInfo: Story = {
  render: () => <Component name="name" email="email@mail.com" />,
};
