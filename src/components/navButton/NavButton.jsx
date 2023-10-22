import React from "react";
import { ArrowLeftOutlined, ArrowRightOutlined } from "@ant-design/icons";
import { Button } from "antd";
import "./NavButton.css";

function NavButton() {
  return (
    <div className="button-wrapper">
      <Button type="primary" style={{ background: "#8a9cff" }}>
        <ArrowLeftOutlined />
        <span>Prev</span>
      </Button>

      <Button type="primary" style={{ background: "#8a9cff" }}>
        <span>Next</span>
        <ArrowRightOutlined />
      </Button>
    </div>
  );
}

export default NavButton;
