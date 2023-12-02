import type { Meta, StoryObj } from "@storybook/react";

import { createColumnHelper } from "@tanstack/react-table";
import { Table as Component } from "./Table";

const meta: Meta<typeof Component> = {
  component: Component,
};

export default meta;
type Story = StoryObj<typeof Component>;

type RowData = {
  name: string;
  role: string;
  status: string;
};

const data: RowData[] = [
  { name: "John Doe", role: "Admin", status: "Active" },
  { name: "Jane Doe", role: "Admin", status: "Active" },
  { name: "John Doe", role: "Admin", status: "Active" },
  { name: "Jane Doe", role: "Admin", status: "Active" },
  { name: "John Doe", role: "Admin", status: "Active" },
  { name: "Jane Doe", role: "Admin", status: "Active" },
  { name: "John Doe", role: "Admin", status: "Active" },
  { name: "Jane Doe", role: "Admin", status: "Active" },
  { name: "John Doe", role: "Admin", status: "Active" },
  { name: "Jane Doe", role: "Admin", status: "Active" },
  { name: "John Doe", role: "Admin", status: "Active" },
  { name: "Jane Doe", role: "Admin", status: "Active" },
  { name: "John Doe", role: "Admin", status: "Active" },
  { name: "Jane Doe", role: "Admin", status: "Active" },
];

const columnHelper = createColumnHelper<RowData>();

const columns = [
  columnHelper.accessor("name", { enableSorting: false, header: "Name" }),
  columnHelper.accessor("role", { enableSorting: false, header: "Role" }),
  columnHelper.accessor("role", { enableSorting: false, header: "Role" }),
  columnHelper.accessor("status", { enableSorting: false, header: "Status" }),
];

export const Pagination: Story = {
  render: () => <Component columns={columns} data={data} />,
};
