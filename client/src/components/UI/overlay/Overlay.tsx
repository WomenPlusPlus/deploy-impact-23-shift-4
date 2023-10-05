import React, { useState } from "react";
import { Drawer as OverlayComponent } from "antd";

import "./Overlay.css";

interface OverlayProps {
  icon: any;
  content: any;
}

const Overlay: React.FC<OverlayProps> = ({ icon, content }) => {
  const [open, setOpen] = useState(false);

  const showDrawer = () => {
    setOpen(true);
  };

  const onClose = () => {
    setOpen(false);
  };

  return (
    <>
      <div className="button" onClick={showDrawer}>
        {icon}
      </div>
      <OverlayComponent
        placement="right"
        onClose={onClose}
        open={open}
        width={250}
      >
        {content}
      </OverlayComponent>
    </>
  );
};

export default Overlay;
