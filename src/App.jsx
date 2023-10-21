import { useEffect, useState } from "react";
import "./App.css";
import getPlayers from "./utils/getPlayers";
import at from "v-at";
import PlayerList from "./components/PlayerList";

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
      {(at(players, "data") || []).map((player) => (
        <PlayerList player={player} key={player.id} />
      ))}
    </>
  );
}

export default App;
