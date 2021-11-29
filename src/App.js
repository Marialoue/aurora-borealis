import React, { useState } from "react";
import PlanetCardList from "./components/PlanetCardList";
import Spinner from "./components/Spinner";
import "./App.css";

export default function App() {
  const [start, setStart] = useState();
  const [end, setEnd] = useState();
  const [data, setData] = useState();
  const [status, setStatus] = useState(false);
  // status is used for setting loading status in order to show the spinner before the data is fetched

  const apiKey = process.env.REACT_APP_KEY;

  const url = `https://api.nasa.gov/planetary/apod?start_date=${start}&end_date=${end}&api_key=${apiKey}`;

  const handleSearch = (event) => {
    start && end
      ? fetchData(event)
      : alert("You forgot to enter " + (start ? "end date" : "start date"));
  };

  // add local storage to save like/unlike

  const fetchData = async (event) => {
    setStatus(true);
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
    <main className="main">
      <header className="header">
        <h2>Spacestagram</h2>
        <hgroup>
          <p>
            Presenting data from the Astronomy Picture of the Day API from NASA.{" "}
            <a
              href="https://api.nasa.gov/"
              title="Information about APIs from NASA."
              rel="noreferrer"
            >
              Find out more about APOD
            </a>
            . Enter start and end dates below to get some astronomy information.
          </p>
        </hgroup>
      </header>

      <nav></nav>

      <form className="controls">
        <label for="start">Start date</label>
        <input
          type="date"
          id="start"
          required={true}
          onKeyDown={(e) => setStart(e.target.value)}
          onChange={(e) => setStart(e.target.value)}
        />

        <label>End date</label>
        <input
          type="date"
          id="end"
          required={true}
          onKeyDown={(e) => setEnd(e.target.value)}
          onChange={(e) => setEnd(e.target.value)}
        />

        <input
          className="btn"
          type="submit"
          value="Search"
          onKeyDown={handleSearch}
          onClick={handleSearch}
        />
      </form>
      <article className="content">
        {data ? <PlanetCardList data={data} /> : status ? <Spinner /> : null}
      </article>
    </main>
  );
}
