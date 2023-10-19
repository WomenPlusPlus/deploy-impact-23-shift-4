import React from "react";
import { Tabs as AntTabs } from "antd";

type TabItem = {
  label: string;
  key: string;
  children: React.ReactNode | string;
};

type TabsProps = {
  className?: string;
  defaultActiveKey: string;
  centered: boolean;
  items: TabItem[];
  size?: "small" | "middle" | "large" | undefined;
};

const Tabs: React.FC<TabsProps> = ({
  className,
  defaultActiveKey,
  centered,
  items,
  size,
}) => (
  <AntTabs
    className={className}
    defaultActiveKey={defaultActiveKey}
    centered={centered}
    items={items}
    size={size}
  />
);

export default Tabs;
