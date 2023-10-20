import React, { useState } from "react";
import { Tabs as AntTabs } from "antd";

type TabItem = {
  label: string;
  key: string;
  children: React.ReactNode | string;
};

type TabsProps = {
  centered: boolean;
  items: TabItem[];
};

const Tabs: React.FC<TabsProps> = ({ centered, items }) => {
  const storedActiveKey = localStorage.getItem("activeTabKey");
  const [activeKey, setActiveKey] = useState<string | undefined>(
    storedActiveKey && items.some((item) => item.key === storedActiveKey)
      ? storedActiveKey
      : undefined
  );

  const handleTabChange = (key: string) => {
    setActiveKey(key);
    localStorage.setItem("activeTabKey", key);
  };

  return (
    <AntTabs
      defaultActiveKey={activeKey}
      activeKey={activeKey}
      centered={centered}
      onChange={handleTabChange}
    >
      {items.map((item) => (
        <AntTabs.TabPane tab={item.label} key={item.key}>
          {item.children}
        </AntTabs.TabPane>
      ))}
    </AntTabs>
  );
};

export default Tabs;
