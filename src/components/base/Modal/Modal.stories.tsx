import type { Meta, StoryObj } from "@storybook/react";

import { Modal as Component, ModalProps as ComponentProps } from "./Modal";

const meta: Meta<ComponentProps> = {
  // @ts-ignore
  component: Component,
};

export default meta;
type Story = StoryObj<typeof Component>;

export const Modal: Story = {
  render: () => (
    <Component isOpen onClose={() => undefined}>
      <span>1</span>
      <span>2</span>
      <span>3</span>
      <span>4</span>
    </Component>
  ),
};
