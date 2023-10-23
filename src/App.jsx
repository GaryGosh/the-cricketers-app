import { useEffect, useState } from "react";
import "./App.css";
import { getPlayers } from "./utils/getPlayers";
import at from "v-at";
import PlayerList from "./components/playerLIst/PlayerList";
import { Col, Row } from "antd";
import NavButton from "./components/navButton/navButton";
import Header from "./components/header/Header";
import Filters from "./components/filters/Filters";

function App() {
  const [players, setPlayers] = useState([]);
  const [currentPage, setCurretPage] = useState(1);
  const [filters, setFilters] = useState({ page: currentPage });
  // let body = { type: "batsman", sortBy: "rank", page: 1 };

  useEffect(() => {
    getPlayers(filters)
      .then((result) => {
        console.log(result);
        setPlayers(result);
        setCurretPage(at(result, "page") || 1);
      })
      .catch((error) => {
        console.log(error);
      });
  }, [filters]);

  const fetchNext = () => {
    if (at(players, "page") < at(players, "totalPages")) {
      // setCurretPage(currentPage + 1);
      setFilters({ ...filters, page: currentPage + 1 });
    }
  };

  const fetchPrev = () => {
    if (at(players, "page") > 1) {
      // setCurretPage(currentPage - 1);
      setFilters({ ...filters, page: currentPage - 1 });
    }
  };

  const onChangeToggle = (checked) => {
    console.log(`switch to ${checked}`);
    if (checked) {
      setFilters({ ...filters, isDescending: true });
    } else {
      setFilters({ ...filters, isDescending: false });
    }
    // todo: map to query
  };

  const handleSortByChange = (value) => {
    console.log(`selected sort ${value}`);
    setFilters({ ...filters, sortBy: value });
    // todo: map to query
  };

  const handleFilterByChange = (value) => {
    console.log(`selected filter ${value}`);
    setFilters({ ...filters, type: value });
    // todo: map to query
  };

  const clearAllFilters = () => {
    setFilters({ page: 1 });
    // todo: remove added queries
  };

  return (
    <>
      <Header />

      <Filters
        handleSortByChange={handleSortByChange}
        onChangeToggle={onChangeToggle}
        handleFilterByChange={handleFilterByChange}
        clearFilters={clearAllFilters}
        filterValues={filters}
      />

      <Row gutter={[16, 16]} className="title-wrapper">
        <Col span={6}>
          <div className="title">Player</div>
        </Col>
        <Col span={6}>
          <div className="title">Rank</div>
        </Col>
        <Col span={6}>
          <div className="title">Points</div>
        </Col>
        <Col span={6}>
          <div className="title">Age</div>
        </Col>
      </Row>
      {/* Player list */}
      {(at(players, "data") || []).map((player) => (
        <PlayerList player={player} key={player.id} />
      ))}

      {/* prev - next button */}
      <NavButton
        totalPages={at(players, "totalPages")}
        currentPage={at(players, "page")}
        onclickBack={fetchPrev}
        onClickNext={fetchNext}
      />
    </>
  );
}

export default App;
