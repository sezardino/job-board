import type { Meta, StoryObj } from "@storybook/react";

import {
  Pagination as Component,
  PaginationProps as ComponentProps,
} from "./Pagination";

const meta: Meta<ComponentProps> = {
  component: Component,
};

export default meta;
type Story = StoryObj<typeof Component>;

export const Pagination: Story = {
  render: () => (
    <Component current={1} onPageChange={() => undefined} total={100} />
  ),
};
