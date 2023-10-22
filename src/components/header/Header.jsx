import { PlayCircleOutlined } from "@ant-design/icons";
import React from "react";

function Header() {
  return (
    <div className="header-wrapper">
      <h1 className="main-header">THE CRICKETER&apos;S APP</h1>
      <PlayCircleOutlined spin />
    </div>
  );
}

export default Header;
