import React from "react";
import { ArrowLeftOutlined, ArrowRightOutlined } from "@ant-design/icons";
import { Button } from "antd";
import "./NavButton.css";

const btnStyle = {
  background: "#8a9cff",
};

function NavButton({ totalPages, currentPage, onclickBack, onClickNext }) {
  return (
    <div className="button-wrapper">
      <Button
        type="primary"
        className="btn"
        style={currentPage !== 1 ? btnStyle : {}}
        disabled={currentPage === 1 ? true : false}
        onClick={() => onclickBack()}
      >
        <ArrowLeftOutlined />
        <span>Prev</span>
      </Button>

      <Button
        type="primary"
        style={currentPage !== totalPages ? btnStyle : false}
        disabled={currentPage === totalPages ? true : false}
        onClick={() => onClickNext()}
      >
        <span>Next</span>
        <ArrowRightOutlined />
      </Button>
    </div>
  );
}

export default NavButton;
