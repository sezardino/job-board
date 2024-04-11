"use client";

import { Icon, IconNames } from "@/components/base/Icon/Icon";
import { useState, type ComponentPropsWithoutRef, type FC } from "react";
import { twMerge } from "tailwind-merge";

import { Grid } from "@/components/base/Grid/Grid";
import Link from "next/link";
import styles from "./AppSidebar.module.scss";

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
        styles.element,
        isOpen && styles.opened,
        !isOpen && styles.closed,
        className
      )}
      aria-label={copy.title}
    >
      {/* TODO: add brand */}
      {/* <Brand href={brandHref} isTextHidden={!isOpen} /> */}
      <div className={styles.wrapper}>
        {lists.map((items, index) => (
          <Grid key={index} tag="ul" gap={2} className={styles.list}>
            {items.map((item, index) => (
              <li key={index}>
                <Link
                  href={item.to}
                  className={twMerge(styles.link)}
                  onClick={() => {
                    setIsOpen(false);
                    item.onClick;
                  }}
                >
                  <Icon name={item.icon} />
                  <span
                    className={twMerge(
                      styles.label,
                      !isOpen && styles.notExpanded
                    )}
                  >
                    {item.label}
                  </span>
                </Link>
              </li>
            ))}
          </Grid>
        ))}
      </div>
      <button type="button" className={styles.toggle} onClick={toggleOpen}>
        <Icon
          name={!isOpen ? "HiChevronDoubleRight" : "HiChevronDoubleLeft"}
          size={14}
        />
      </button>

      <button
        type="button"
        className={styles.hamburger}
        onClick={toggleOpen}
        aria-label={isOpen ? copy.closeSidebar : copy.openSidebar}
      >
        <Icon name={!isOpen ? "HiMenu" : "HiOutlineXCircle"} size={24} />
      </button>
    </aside>
  );
};
