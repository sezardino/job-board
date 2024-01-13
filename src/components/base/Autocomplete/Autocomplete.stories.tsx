import type { Meta, StoryObj } from "@storybook/react";

import { useState } from "react";
import {
  Autocomplete as Component,
  AutocompleteProps as ComponentProps,
} from "./Autocomplete";

const meta: Meta<ComponentProps<any>> = {
  component: Component,
};

export default meta;
type Story = StoryObj<typeof Component>;

const Render = (props: any) => {
  const [isMultiple, setIsMultiple] = useState(true);
  const [show, setShow] = useState<"in" | "out">("in");

  const [selected, setSelected] = useState<string>();
  const [multipleSelected, setMultipleSelected] = useState<string[]>([]);

  const items = [
    { id: "1", label: "Label 1" },
    { id: "2", label: "Label 2" },
    { id: "3", label: "Label 3" },
    { id: "4", label: "Label 4" },
    { id: "5", label: "Label 5" },
    { id: "6", label: "Label 6" },
    { id: "7", label: "Label 7" },
    { id: "8", label: "Label 8" },
    { id: "9", label: "Label 9" },
    { id: "10", label: "Label 10" },
    { id: "11", label: "Label 11" },
  ];

  const onSelectChange = (value?: string | string[]) => {
    if (isMultiple) {
      setMultipleSelected(value as string[]);
    } else {
      setSelected(value as string);
    }
  };

  const selectedItems = isMultiple ? multipleSelected : selected;

  return (
    <div className="grid grid-cols-1 gap-5">
      <label className="flex gap-4">
        <input
          type="checkbox"
          checked={isMultiple}
          onChange={(evt) => setIsMultiple(evt.currentTarget.checked)}
        />
        is multiple
      </label>
      <label className="flex gap-4">
        <input
          type="checkbox"
          checked={show === "in"}
          onChange={(evt) => setShow(evt.currentTarget.checked ? "in" : "out")}
        />
        show {show === "in" ? "in" : "out"}
      </label>
      {/* @ts-ignore */}
      <Component
        {...props}
        label="Label"
        items={items}
        error="Error"
        description="Description"
        selected={selectedItems}
        showSelected={show}
        multiple={isMultiple}
        onSelectedChange={onSelectChange}
        header={<span>header here</span>}
        footer={<span>footer here</span>}
      />

      <pre>
        selected:
        {JSON.stringify(selected)}
        <br />
        selected multiple:
        {JSON.stringify(multipleSelected)}
      </pre>
    </div>
  );
};

export const Autocomplete: Story = {
  render: Render,
};
