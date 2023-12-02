import type { Meta, StoryObj } from "@storybook/react";

import {
  LoadingOverlay as Component,
  LoadingOverlayProps as ComponentProps,
} from "./LoadingOverlay";

const meta: Meta<ComponentProps> = {
  component: Component,
};

export default meta;
type Story = StoryObj<typeof Component>;

export const LoadingOverlay: Story = {
  render: () => <Component />,
};
