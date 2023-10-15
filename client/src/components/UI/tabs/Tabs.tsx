import React from "react";
import { Tabs as AntTabs } from "antd";

type TabItem = {
  label: string;
  key: string;
  children: React.ReactNode | string;
};

type TabsProps = {
  defaultActiveKey: string;
  centered: boolean;
  items: TabItem[];
};

const Tabs: React.FC<TabsProps> = ({ defaultActiveKey, centered, items }) => (
  <AntTabs
    defaultActiveKey={defaultActiveKey}
    centered={centered}
    items={items}
  />
);

export default Tabs;
