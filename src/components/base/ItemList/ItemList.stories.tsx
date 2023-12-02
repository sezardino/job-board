import type { Meta, StoryObj } from "@storybook/react";

import {
  ItemList as Component,
  ItemListProps as ComponentProps,
} from "./ItemList";

const meta: Meta<ComponentProps<any>> = {
  component: Component,
  argTypes: {
    items: {
      control: {
        type: "object",
      },
    },
    maxLength: {
      control: {
        type: "number",
      },
    },
    withCommas: {
      control: {
        type: "boolean",
      },
    },
    badgeVariant: {
      control: {
        type: "select",
        options: ["solid", "shadow", "bordered", "dot"],
      },
    },
  },
};

export default meta;
type Story = StoryObj<typeof Component>;

const items = [
  "Item 1",
  "Item 2",
  "Item 3",
  "Item 4",
  "Item 5",
  "Item 6",
  "Item 7",
  "Item 8",
];

export const ItemList: Story = {
  render: (props) => (
    <Component
      maxLength={2}
      {...props}
      items={items}
      withCommas
      renderItem={(i) => <span>{i}</span>}
    />
  ),
};
