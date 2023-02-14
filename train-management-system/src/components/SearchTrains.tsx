import axios from "axios";
import { useState, useEffect } from "react";
import Dropdown from "react-bootstrap/Dropdown";
import "../styles/SearchTrains.css";
import "../styles/Background.css";
import TrainCard from "./TrainCard";
import "../styles/Background.css"



interface TrainStation {
  _id: string;
  location: {
    city: string;
    postcode: string;
  };
  trains: Train[];
}

interface Train {
  name: string;
  price: number;
  seats_available: number;
  station_from: string;
  time_from: [Date];
  station_to: string;
  time_to: [Date];
}

/** 
   * *
   * Searches for all the train possibilities and returns them to the user
   * 
   *  @returns return an array of train cards */
const SearchTrains = () => {
  const [listOfTrains, setListOfTrains] = useState<Array<TrainStation>>([]);
  const [stationFrom, setStationFrom] = useState<string>("");
  const [stationToChosen, setStationChosenTo] = useState<string>("");
  const [stationTo, setStationTo] = useState<Array<TrainStation>>([]);
  const trainOptionsFrom = listOfTrains.map((train) => train.location.city);
  const trainOptionsTo = stationTo[0]?.trains.map((train) => train.station_to);
  const api = "http://localhost:3899/trainStation/";
  const getTrains = () => {
    axios
      .get(api + "getAllStations")
      .then((res) => setListOfTrains(res.data.trainStation));
  };

  const getTrainsFrom = () => {
    axios
      .get(api + "getTrainsFrom/" + stationFrom)
      .then((res) => setStationTo(res.data.trainStation));
  };

  /** 
   * *
   * filter trains to show only trains possible
   * 
   *  @returns an array of possible trains */
  const filterStations = () => {
    if (!stationToChosen) return;
    return stationTo.map((stations) =>
      stations.trains.filter((train) =>
        train.station_to.includes(stationToChosen)
      )
    );
  };

  useEffect(() => {
    getTrains();
    if (stationFrom) getTrainsFrom();
  }, [stationFrom]);

  return (
   
    <>
    <br></br>
      <Dropdown className="dropdown-container">
        From: 
        <Dropdown.Toggle variant="primary" id="dropdown-basic">
          {stationFrom ? stationFrom.toUpperCase() : "Please Choose a Station"}
        </Dropdown.Toggle>
        <Dropdown.Menu>
          {trainOptionsFrom.map((train) => (
            <Dropdown.Item onClick={() => setStationFrom(train)} key={train}>
              {train}
            </Dropdown.Item>
          ))}
        </Dropdown.Menu>
      </Dropdown>
      <p></p>
      <Dropdown className="dropdown-container">
        To: 
        <Dropdown.Toggle variant="primary" id="dropdown-basic">
          {stationToChosen
            ? stationToChosen.toUpperCase()
            : "Please Choose a Station"}
        </Dropdown.Toggle>
        <Dropdown.Menu>
          {trainOptionsTo
            ? trainOptionsTo.map((train) => (
                <Dropdown.Item
                  onClick={() => setStationChosenTo(train)}
                  key={train}
                >
                  {train}
                </Dropdown.Item>
              ))
            : null}
        </Dropdown.Menu>
      </Dropdown>

      {filterStations()?.map((station) =>
        station.map((train) =>
          train.time_from.map((time) => (
            <TrainCard
              key={time.toString()}
              train={train}
              time_from={time}
              time_to={train.time_to[train.time_from.indexOf(time)]}
            />
          ))
        )
      )}
    </>
  );
};

export default SearchTrains;
