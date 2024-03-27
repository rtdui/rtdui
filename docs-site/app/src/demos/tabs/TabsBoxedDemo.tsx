import { Tabs } from "@rtdui/core";

export default function Demo() {
  return (
    <Tabs variant="boxed">
      <Tabs.TabPanel label="tab1" className="bg-base-100">
        tab1 content
      </Tabs.TabPanel>
      <Tabs.TabPanel label="tab2" className="bg-base-100">
        tab2 content
      </Tabs.TabPanel>
    </Tabs>
  );
}
Demo.displayName = "TabsBoxedDemo";
