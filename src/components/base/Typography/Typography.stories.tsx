import type { Meta, StoryObj } from "@storybook/react";

import {
  Typography as Component,
  TypographyProps as ComponentProps,
} from "./Typography";

const meta: Meta<ComponentProps> = {
  component: Component,
};

export default meta;
type Story = StoryObj<typeof Component>;

export const Typography: Story = {
  render: (props) => (
    <Component {...props} tag="p" styling="3xl">
      Typography
    </Component>
  ),
};
