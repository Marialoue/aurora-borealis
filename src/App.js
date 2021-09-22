import React, { useState } from "react";
import PlanetCardList from "./components/PlanetCardList";
import Spinner from "./components/Spinner";
import "./App.css";

export default function App() {
  const [start, setStart] = useState();
  const [end, setEnd] = useState();
  const [data, setData] = useState();

  const apiKey = process.env.REACT_APP_KEY;

  const url = `https://api.nasa.gov/planetary/apod?start_date=${start}&end_date=${end}&api_key=${apiKey}`;

  const handleSearch = (event) => {
    start && end
      ? fetchData(event)
      : alert("You forgot to enter " + (start ? "end date" : "start date"));
  };

  const fetchData = async (event) => {
    event.preventDefault();

    const response = await fetch(url);
    if (response.status === 200) {
      const res = await response.json();
      // console.log("res: ", res);
      setData(res);
    } else {
      throw new Error("Unable to fetch data");
    }
  };

  return (
    <div className="container">
      <div className="header">
        <p>SPACEGRAM</p>
        <p>
          Presenting data from the Astronomy Picture of the Day API from NASA.
          You can read more about it <a href="https://api.nasa.gov/">here</a>.
        </p>
        <p>Simply enter some dates below to get some astronomy information</p>
      </div>
      <div className="controls">
        <div>
          <span>
            <label for="start">Start date</label>
          </span>
          <input
            type="date"
            id="start"
            placeholder={"yyyy-mm-dd"}
            onChange={(e) => setStart(e.target.value)}
          />
        </div>

        <div>
          <span>
            <label for="end">End date</label>{" "}
            <input
              type="date"
              id="end"
              placeholder={"yyyy-mm-dd"}
              onChange={(e) => setEnd(e.target.value)}
            />
          </span>
        </div>

        <button className="btn" onClick={handleSearch}>
          Search
        </button>
      </div>
      <div className="content">
        {data ? <PlanetCardList data={data} /> : <Spinner />}
      </div>
    </div>
  );
}

// get APOD as "front" and spinner when loading data
