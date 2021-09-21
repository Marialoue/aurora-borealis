import React, { useState } from "react";
import Button from "@mui/material/Button";
import styled from "styled-components";
import TextField from "@mui/material/TextField";
import PlanetCardList from "./components/PlanetCardList";
import "./App.css";

const Container = styled("div")`
  height: fit-content;
  padding: 5px;
  margin: auto;
`;

const Header = styled("div")`
  min-height: 64px;
  padding: 24px;
  text-align: center;
  font-size: 20px;
`;

const Controlls = styled("div")`
  min-height: 64px;
  padding: 24px;
  text-align: center;
  font-size: 20px;
`;

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
    <Container>
      <Header>
        SPACEGRAM
        <br />
        Presenting data from NASA api
      </Header>
      <Controlls
        component="form"
        sx={{
          display: "flex",
          justifyContent: "space-evenly",
          bgcolor: "background.paper",
          "& > :not(style)": { m: 1, width: "25ch" },
        }}
        noValidate
        autoComplete="off"
      >
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
      </Controlls>
      <div className="content">
        {data ? (
          <PlanetCardList data={data} />
        ) : (
          <h2>placeholder for spinner</h2>
        )}
      </div>
    </Container>
  );
}
