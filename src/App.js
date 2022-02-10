import React, { useState } from "react";
import PlanetCardList from "./components/PlanetCardList";
import Spinner from "./components/Spinner";

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

  // add date validation if date is in future or before june 16, 1995.

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
        {data ? <PlanetCardList data={data} /> : status ? <Spinner /> : null}
      </section>
    </main>
  );
}
