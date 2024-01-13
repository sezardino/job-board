import type { Meta, StoryObj } from "@storybook/react";

import {
  AppSidebar as Component,
  AppSidebarProps as ComponentProps,
} from "./AppSidebar";

const meta: Meta<ComponentProps> = {
  component: Component,
};

export default meta;
type Story = StoryObj<typeof Component>;

export const AppSidebar: Story = {
  render: () => {
    return (
      <div className="grid grid-cols-[auto_1fr]">
        <Component
          brandHref="#"
          lists={[
            [{ to: "#", label: "Title", icon: "HiAcademicCap" }],
            [{ to: "#", label: "Title", icon: "HiAcademicCap" }],
          ]}
          copy={{
            closeSidebar: "Close Sidebar",
            openSidebar: "Open Sidebar",
            title: "Title",
          }}
          className="sticky top-0 left-0"
        />
      </div>
    );
  },
};
