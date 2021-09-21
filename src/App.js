import React, { useState } from "react";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import PlanetCardList from "./components/PlanetCardList";
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
      console.log("res: ", res);
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
        <p>Simply enter some dates below to get some Astronomy information</p>
      </div>
      <div className="controls">
        <TextField
          id="outlined-basic"
          label="Start date"
          variant="outlined"
          placeholder={"yyyy-mm-dd"}
          onChange={(e) => setStart(e.target.value)}
        />
        <TextField
          id="outlined-basic"
          label="End date"
          variant="outlined"
          placeholder={"yyyy-mm-dd"}
          onChange={(e) => setEnd(e.target.value)}
        />
        <Button variant="outline" onClick={handleSearch}>
          SEARCH
        </Button>
      </div>
      <div className="content">
        {data ? (
          <PlanetCardList data={data} />
        ) : (
          <h2>placeholder for spinner</h2>
        )}
      </div>
    </div>
  );
}
