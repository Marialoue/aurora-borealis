import React, { useState } from "react";
import FrontPlanet from "./components/FrontPlanet";
import PlanetCardList from "./components/PlanetCardList";
import Spinner from "./components/Spinner";

export default function App() {
  // TODO: clean up and divide to separate functional components

  const [start, setStart] = useState();
  const [end, setEnd] = useState();
  const [data, setData] = useState();
  const [status, setStatus] = useState(false);

  const apiKey = process.env.REACT_APP_KEY;

  const url = `https://api.nasa.gov/planetary/apod?start_date=${start}&end_date=${end}&api_key=${apiKey}`;

  const handleSearch = (event) => {
    start && end
      ? fetchData(event)
      : alert("You forgot to enter " + (start ? "end date" : "start date"));
  };

  const fetchData = async (event) => {
    setStatus(true);
    event.preventDefault();

    const response = await fetch(url);
    if (response.status === 200) {
      const res = await response.json();
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
              title="Information about the APOD API from NASA."
              rel="noreferrer"
            >
              Find out more about APOD
            </a>
            .
            <br />
            The archive goes from current date through June 16, 1995.
          </p>
        </hgroup>
      </header>

      <form className="controls">
        <label for="start">
          Start date
          <input
            type="text"
            id="start"
            placeholder="YYYY-MM-DD"
            required={true}
            onKeyDown={(e) => setStart(e.target.value)}
            onChange={(e) => setStart(e.target.value)}
          />
        </label>

        <label>
          End date
          <input
            type="text"
            // TODO: add date validation if date is in future or before june 16, 1995.
            // disable future dates
            // make date picker
            id="end"
            placeholder="YYYY-MM-DD"
            required={true}
            onKeyDown={(e) => setEnd(e.target.value)}
            onChange={(e) => setEnd(e.target.value)}
          />
        </label>

        <input
          className="btn"
          type="submit"
          value="Search"
          onKeyDown={handleSearch}
          onClick={handleSearch}
        />
      </form>
      <section className="content">
        {data ? <PlanetCardList data={data} /> : status ? <Spinner /> : <FrontPlanet />}
      </section>
    </main>
  );
}
