import type { Meta, StoryObj } from "@storybook/react";

import { useState } from "react";
import {
  SearchForm as Component,
  SearchFormProps as ComponentProps,
} from "./SearchForm";

const meta: Meta<ComponentProps> = {
  component: Component,
};

export default meta;
type Story = StoryObj<typeof Component>;

const Render = () => {
  const [value, setValue] = useState<string>("");

  return (
    <Component
      onSearch={setValue}
      initialValue={value}
      placeholder="Search"
      className="w-96"
    />
  );
};

export const SearchForm: Story = {
  render: Render,
};
