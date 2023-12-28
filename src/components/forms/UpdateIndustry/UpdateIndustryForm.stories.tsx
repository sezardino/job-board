import type { Meta, StoryObj } from "@storybook/react";

import { EntityStatus } from "@prisma/client";
import {
  UpdateIndustryForm as Component,
  UpdateIndustryFormProps as ComponentProps,
} from "./UpdateIndustryForm";

const meta: Meta<ComponentProps> = {
  component: Component,
};

export default meta;
type Story = StoryObj<typeof Component>;

export const EditIndustryForm: Story = {
  render: () => (
    <Component
      initialStatus={EntityStatus.CREATED}
      onCancelClick={() => undefined}
      onFormSubmit={() => undefined}
    />
  ),
};
