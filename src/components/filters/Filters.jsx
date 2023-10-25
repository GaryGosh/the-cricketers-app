import { Input, Select, Switch } from "antd";
import React from "react";
import "./Filter.css";
import { CloseCircleOutlined } from "@ant-design/icons";
import at from "v-at";

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
  onSearch,
  handleSortByChange,
  onChangeToggle,
  handleFilterByChange,
  clearFilters,
  filterValues,
}) {
  return (
    <div className="filter-container">
      <div className="search-wrapper">
        <Input placeholder="Search player name .." onChange={onSearch} />
      </div>
      <div className="sort-by-wrapper">
        <div>Sort by</div>
        <Select
          style={{
            width: 120,
          }}
          onChange={handleSortByChange}
          options={SORT_OPTIONS}
          value={at(filterValues, "sortBy")}
        />
      </div>
      <div className="toggle-wrapper">
        <div className="toggle-text">Descending</div>
        <Switch
          onChange={onChangeToggle}
          checked={at(filterValues, "isDescending")}
        />
      </div>
      <div className="type-filter-wrapper">
        <div>Filter by Type</div>
        <Select
          style={{
            width: 120,
          }}
          onChange={handleFilterByChange}
          options={TYPE_OPTIONS}
          value={at(filterValues, "type")}
        />
      </div>
      <CloseCircleOutlined
        style={{
          color: "red",
          fontSize: "22px",
          cursor: "pointer",
        }}
        className="clear-btn"
        onClick={clearFilters}
      />
    </div>
  );
}

export default Filters;
