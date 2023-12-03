import type { Meta, StoryObj } from "@storybook/react";

import {
  WindowNavigation as Component,
  WindowNavigationProps as ComponentProps,
} from "./WindowNavigation";

const meta: Meta<ComponentProps> = {
  component: Component,
};

export default meta;
type Story = StoryObj<typeof Component>;

const links = [
  { title: "Home", href: "/" },
  { title: "About", href: "/about" },
  { title: "Contact", href: "/contact" },
];

export const WindowNavigation: Story = {
  render: (props) => <Component {...props} items={links} title="Links" />,
};
