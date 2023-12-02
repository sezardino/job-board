import type { Meta, StoryObj } from "@storybook/react";

import {
  AppNavbar as Component,
  AppNavbarProps as ComponentProps,
} from "./AppNavbar";

const meta: Meta<ComponentProps> = {
  component: Component,
};

export default meta;
type Story = StoryObj<typeof Component>;

export const AppNavbar: Story = {
  render: () => (
    <Component
      login="A..."
      onSignOutClick={() => undefined}
      copy={{
        logout: "Logout",
        userMenu: "User Menu",
      }}
    />
  ),
};
