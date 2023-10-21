import { useEffect, useState } from "react";
import "./App.css";
import getPlayers from "./utilas/getPlayers";

function App() {
  let body = { type: "batsman", sortBy: "rank", page: 1 };

  useEffect(() => {
    getPlayers(body).then((result) => {
      console.log(result);
    });
  }, []);

  return <>hi</>;
}

export default App;
