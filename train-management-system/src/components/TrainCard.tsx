import React from "react";
import Button from "react-bootstrap/Button";
import Card from "react-bootstrap/Card";
import { useNavigate } from 'react-router-dom';

interface Train {
  name: string;
  seats_available: number;
  station_from: string;
  price: number;
  time_from: [Date];
  station_to: string;
  time_to: [Date];
}

interface trainProp {
  train: Train;
  time_from: Date;
  time_to: Date;
}

/** 
   * *
   * returns the information of a train
   * 
   *  @returns returns train carrd */

const TrainCard = (props: trainProp) => {
  const { seats_available, station_from, price, station_to } = props.train;
  const navigate = useNavigate();

  const addToBasket = () => {
    navigate(`/confirmation/${station_from}/${props.time_from.toString().slice(11, 16)}/${station_to}/${props.time_to.toString().slice(11, 16)}/${price}`)
  }

  return (
    <div>
      <Card style={{ margin: "50px", width: "1000px" }}>
        <Card.Body style={{ padding: "50px" }}>
          <Card.Title>Seats Available: {seats_available}</Card.Title>
          <Card.Title>Price: £{price.toFixed(2)}</Card.Title>
          <Card.Title>Time:</Card.Title>
          <Card.Text>
            <h3>
              <b>
                {props.time_from.toString().slice(11, 16)}&nbsp; - &nbsp;
                {props.time_to.toString().slice(11, 16)}
              </b>
            </h3>
          </Card.Text>
          <Card.Title>From: {station_from.toUpperCase()}</Card.Title>
          <Card.Title>To: {station_to.toUpperCase()}</Card.Title>
          <Button onClick={addToBasket}>Buy Ticket</Button>
        </Card.Body>
      </Card>
    </div>
  );
};

export default TrainCard;
