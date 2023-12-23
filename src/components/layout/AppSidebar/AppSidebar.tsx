"use client";

import { Icon, IconNames } from "@/components/base";
import { useState, type ComponentPropsWithoutRef, type FC } from "react";
import { twMerge } from "tailwind-merge";

type CopyProp = {
  title: string;
  closeSidebar: string;
  openSidebar: string;
};

export type AppSidebarItem = {
  label: string;
  to: string;
  onClick?: () => void;
  icon: IconNames;
};

export type AppSidebarProps = ComponentPropsWithoutRef<"aside"> & {
  lists: AppSidebarItem[][];
  brandHref: string;
  copy: CopyProp;
};

export const AppSidebar: FC<AppSidebarProps> = (props) => {
  const { copy, brandHref, lists, className, ...rest } = props;

  const [isOpen, setIsOpen] = useState(false);

  const toggleOpen = () => setIsOpen((prev) => !prev);

  return (
    <aside
      {...rest}
      className={twMerge(
        "relative h-screen flex flex-col transition-transform md:translate-x-0 border-r py-5 px-3 bg-gray-50",
        isOpen && "max-md:translate-x-0",
        !isOpen && "max-md:-translate-x-full",
        className
      )}
      aria-label={copy.title}
    >
      {/* TODO: add brand */}
      {/* <Brand href={brandHref} isTextHidden={!isOpen} /> */}
      <div className="mt-5 overflow-y-auto h-full">
        {lists.map((items, index) => (
          <ul
            key={index}
            className={twMerge(
              "list-none",
              index === 0
                ? "space-y-2"
                : "pt-5 mt-5 space-y-2 border-t border-gray-200"
            )}
          >
            {items.map((item, index) => (
              <li key={index}>
                <a
                  href={item.to}
                  className="flex items-center p-2 text-base font-medium rounded-lg hover:bg-gray-500 group"
                  onClick={() => {
                    setIsOpen(false);
                    item.onClick;
                  }}
                >
                  <Icon name={item.icon} />
                  <span className={twMerge("ml-3", !isOpen && "sr-only")}>
                    {item.label}
                  </span>
                </a>
              </li>
            ))}
          </ul>
        ))}
      </div>
      <button
        type="button"
        className="absolute bottom-7 right-0 translate-x-1/2 z-10 border rounded-full p-1 bg-gray-50 max-md:hidden"
        onClick={toggleOpen}
      >
        <Icon
          name={!isOpen ? "HiChevronDoubleRight" : "HiChevronDoubleLeft"}
          size={14}
        />
      </button>

      <button
        type="button"
        className="absolute bottom-7 left-full translate-x-3 z-10 border rounded-full p-2 md:hidden bg-gray-50 shadow-2xl"
        onClick={toggleOpen}
        aria-label={isOpen ? copy.closeSidebar : copy.openSidebar}
      >
        <Icon name={!isOpen ? "HiMenu" : "HiOutlineXCircle"} size={24} />
      </button>
    </aside>
  );
};
