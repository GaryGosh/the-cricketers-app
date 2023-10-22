import { useEffect, useState } from "react";
import "./App.css";
import getPlayers from "./utils/getPlayers";
import at from "v-at";
import PlayerList from "./components/playerLIst/PlayerList";
import { Col, Row } from "antd";
import NavButton from "./components/navButton/navButton";

function App() {
  const [players, setPlayers] = useState([]);
  let body = { type: "batsman", sortBy: "rank", page: 1 };

  useEffect(() => {
    getPlayers(body)
      .then((result) => {
        console.log(result);
        setPlayers(result);
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);

  return (
    <>
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

      <NavButton />
    </>
  );
}

export default App;
