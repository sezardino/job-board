import type { Meta, StoryObj } from "@storybook/react";

import {
  CreateIndustryForm as Component,
  CreateIndustryFormProps as ComponentProps,
} from "./CreateIndustryForm";

const meta: Meta<ComponentProps> = {
  component: Component,
};

export default meta;
type Story = StoryObj<typeof Component>;

export const CreateIndustry: Story = {
  render: () => (
    <Component
      onNameAvailableRequest={async () => true}
      onCancelClick={() => undefined}
      onFormSubmit={() => undefined}
    />
  ),
};
