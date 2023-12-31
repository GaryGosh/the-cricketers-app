import { useCallback, useEffect, useState } from "react";
import "./App.css";
import { getPlayers } from "./utils/getPlayers";
import at from "v-at";
import PlayerList from "./components/playerLIst/PlayerList";
import { Col, Row } from "antd";
import NavButton from "./components/navButton/navButton";
import Header from "./components/header/Header";
import Filters from "./components/filters/Filters";
import { getUrl } from "./utils/utils";
import { useLocation, useNavigate } from "react-router-dom";
import { debounce } from "lodash";
import EmptyState from "./assets/emptyState.svg";

const useQuery = () => {
  return new URLSearchParams(useLocation().search);
};

function App() {
  const queries = useQuery();
  const navigate = useNavigate();
  const location = useLocation();
  const [players, setPlayers] = useState([]);
  const [currentPage, setCurretPage] = useState(1);
  const [filters, setFilters] = useState({
    page: currentPage,
    isDescending: queries.get("isDescending") || false,
    sortBy: queries.get("sortBy") || null,
    type: queries.get("type") || null,
    searchKeyword: queries.get("search") || "",
  });
  const [searchKeyword, setSearchKeyword] = useState(
    queries.get("search") || ""
  );

  useEffect(() => {
    getPlayers(filters)
      .then((result) => {
        setPlayers(result);
        setCurretPage(at(result, "page") || 1);
      })
      .catch((error) => {
        console.log(error);
      });

    updateQueries();
  }, [filters]);

  useEffect(() => {
    if (searchKeyword && searchKeyword.length > 3) {
      setFilters({ ...filters, searchKeyword: searchKeyword });
    } else {
      setFilters({ ...filters, searchKeyword: "" });
    }
    updateQueries();
  }, [searchKeyword]);

  // mapping filter changes to queries
  const updateQueries = () => {
    let searchParams = "";

    if (at(filters, "page")) {
      searchParams = getUrl({
        queries,
        add: { page: `${at(filters, "page")}` },
      });
    }

    if (at(filters, "searchKeyword")) {
      searchParams = getUrl({
        queries,
        add: { search: at(filters, "searchKeyword") },
      });
    } else if (queries.get("search")) {
      searchParams = getUrl({ queries, remove: ["search"] });
    }

    if (at(filters, "isDescending")) {
      searchParams = getUrl({
        queries,
        add: { isDescending: `${at(filters, "isDescending")}` },
      });
    } else if (queries.get("isDescending") !== null) {
      searchParams = getUrl({ queries, remove: ["isDescending"] });
    }

    if (at(filters, "sortBy")) {
      searchParams = getUrl({
        queries,
        add: { sortBy: at(filters, "sortBy") },
      });
    } else if (queries.get("sortBy") !== null) {
      searchParams = getUrl({ queries, remove: ["sortBy"] });
    }

    if (at(filters, "type")) {
      searchParams = getUrl({
        queries,
        add: { type: at(filters, "type") },
      });
    } else if (queries.get("type") !== null) {
      searchParams = getUrl({ queries, remove: ["type"] });
    }

    if (searchParams !== "") {
      navigate({
        pathname: location.pathname,
        search: `?${searchParams}`,
      });
    }
  };

  const fetchNext = () => {
    if (at(players, "page") < at(players, "totalPages")) {
      setFilters({ ...filters, page: currentPage + 1 });
    }
  };

  const fetchPrev = () => {
    if (at(players, "page") > 1) {
      setFilters({ ...filters, page: currentPage - 1 });
    }
  };

  // setting search keyword in 500ms delay
  const debouncedSetInputValue = debounce((value) => {
    setSearchKeyword(value);
  }, 500);

  const onSearch = (e) => {
    const newValue = e.target.value;
    debouncedSetInputValue(newValue);
  };

  const onChangeToggle = (checked) => {
    if (checked) {
      setFilters({ ...filters, isDescending: true });
    } else {
      setFilters({ ...filters, isDescending: false });
    }
  };

  const handleSortByChange = (value) => {
    setFilters({ ...filters, sortBy: value });
  };

  const handleFilterByChange = (value) => {
    setFilters({ ...filters, type: value });
  };

  const clearAllFilters = () => {
    setFilters({ page: 1 });
  };

  return (
    <>
      <Header />

      <Filters
        onSearch={onSearch}
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

      {at(players, "data")?.length ? (
        <NavButton
          totalPages={at(players, "totalPages")}
          currentPage={at(players, "page")}
          onclickBack={fetchPrev}
          onClickNext={fetchNext}
        />
      ) : (
        <div>
          <img
            src={EmptyState}
            alt="icon"
            style={{ height: "150px", width: "150px", marginTop: "30px" }}
          />
          <p>No data found..</p>
        </div>
      )}
    </>
  );
}

export default App;
