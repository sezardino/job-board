import type { Meta, StoryObj } from "@storybook/react";

import {
  AuthForm as Component,
  AuthFormProps as ComponentProps,
} from "./AuthForm";

const meta: Meta<ComponentProps> = {
  component: Component,
};

export default meta;
type Story = StoryObj<typeof Component>;

export const Auth: Story = {
  render: () => (
    <Component
      label="Email"
      submitText="Submit"
      type="login"
      onFormSubmit={() => undefined}
    />
  ),
};
