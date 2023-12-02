import type { Meta, StoryObj } from "@storybook/react";

import {
  BaseTextarea as Component,
  BaseTextareaProps as ComponentProps,
} from "./Textarea";

const meta: Meta<ComponentProps> = {
  component: Component,
};

export default meta;
type Story = StoryObj<typeof Component>;

export const Textarea: Story = {
  render: () => <Component />,
};
