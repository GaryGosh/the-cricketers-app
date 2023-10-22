import { Select, Switch } from "antd";
import React from "react";
import "./Filter.css";
import { CloseCircleOutlined } from "@ant-design/icons";

const SORT_OPTIONS = [
  {
    value: "name",
    label: "Name",
  },
  {
    value: "rank",
    label: "Rank",
  },
  {
    value: "age",
    label: "Age",
  },
];

const TYPE_OPTIONS = [
  {
    value: "allRounder",
    label: "All Rounder",
  },
  {
    value: "batsman",
    label: "Batsman",
  },
  {
    value: "bowler",
    label: "Bowler",
  },
];

function Filters({
  handleSortByChange,
  onChangeToggle,
  handleFilterByChange,
  clearFilters,
}) {
  return (
    <div className="filter-container">
      <div className="sort-by-wrapper">
        <div>Sort by</div>
        <Select
          style={{
            width: 120,
          }}
          onChange={handleSortByChange}
          options={SORT_OPTIONS}
        />
      </div>
      <div className="toggle-wrapper">
        <div className="toggle-text">Descending</div>
        <Switch onChange={onChangeToggle} />
      </div>
      <div className="type-filter-wrapper">
        <div>Filter by Type</div>
        <Select
          style={{
            width: 120,
          }}
          onChange={handleFilterByChange}
          options={TYPE_OPTIONS}
        />
      </div>
      <CloseCircleOutlined
        style={{ color: "red", fontSize: "22px", cursor: "pointer" }}
        onClick={clearFilters}
      />
    </div>
  );
}

export default Filters;
