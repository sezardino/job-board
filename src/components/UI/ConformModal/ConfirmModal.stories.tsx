import type { Meta, StoryObj } from "@storybook/react";

import { ConfirmModal as Component } from "./ConfirmModal";

const meta: Meta<typeof Component> = {
  component: Component,
};

export default meta;
type Story = StoryObj<typeof Component>;

const handler = () => undefined;

export const ConfirmModal: Story = {
  render: () => (
    <Component
      isOpen
      onClose={handler}
      title="title"
      description="description"
      cancel={{
        text: "cancel",
        onClick: handler,
      }}
      confirm={{
        text: "confirm",
        onClick: handler,
      }}
    />
  ),
};
