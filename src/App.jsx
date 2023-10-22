import { useEffect, useState } from "react";
import "./App.css";
import getPlayers from "./utils/getPlayers";
import at from "v-at";
import PlayerList from "./components/playerLIst/PlayerList";
import { Col, Row } from "antd";
import NavButton from "./components/navButton/navButton";
import Header from "./components/header/Header";

function App() {
  const [players, setPlayers] = useState([]);
  const [currentPage, setCurretPage] = useState(1);
  // let body = { type: "batsman", sortBy: "rank", page: 1 };
  let body = { page: currentPage };

  useEffect(() => {
    getPlayers(body)
      .then((result) => {
        console.log(result);
        setPlayers(result);
        setCurretPage(at(result, "page") || 1);
      })
      .catch((error) => {
        console.log(error);
      });
  }, [currentPage]);

  const fetchNext = () => {
    if (at(players, "page") < at(players, "totalPages")) {
      setCurretPage(currentPage + 1);
    }
  };

  const fetchPrev = () => {
    if (at(players, "page") > 1) {
      setCurretPage(currentPage - 1);
    }
  };

  return (
    <>
      <Header />
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
