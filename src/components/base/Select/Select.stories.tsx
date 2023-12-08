import type { Meta, StoryObj } from "@storybook/react";

import { Select as Component, SelectProps as ComponentProps } from "./Select";

const meta: Meta<ComponentProps> = {
  component: Component,
};

export default meta;
type Story = StoryObj<typeof Component>;

const options = [
  { label: "Option 1", id: "1" },
  { label: "Option 2", id: "2" },
  { label: "Option 3", id: "3" },
];

export const Select: Story = {
  render: () => (
    <Component options={options} onSelectedChange={() => undefined} />
  ),
};
