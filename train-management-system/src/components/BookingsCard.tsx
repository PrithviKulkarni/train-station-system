import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.bundle";
import Button from "react-bootstrap/Button";
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import "../styles/Background.css"

interface Booking {
  personal_information: {
    _id: string;
    first_name: string;
    last_name: string;
    email: string;
    phone_number: string;
  };
  train: {
    price: number;
    station_from: string;
    time_from: string;
    station_to: string;
    time_to: string;
  };
}

interface BookingProp {
  booking: Booking;
}

/** 
   * *
   * populates a booking card with the booking information required
   * 
   *  @returns a card of booking information */

const BookingCard = (props: BookingProp) => {
  const { personal_information, train } = props.booking;
  const api = "http://localhost:3899/booking/deleteABooking/"
  const navigate = useNavigate()

  const deleteBooking = (name : string) => {
    axios.delete(api+name).then(res => window.location.reload()).catch(err => console.log("Couldn't delete booking"))
  }

  const updateBooking = (booking: Booking) => {
    console.log("BOOKING CARD NAME: " + booking.personal_information.first_name)
    navigate(`/confirmationUpdate/${booking.train.station_from}/${booking.train.time_from}/${booking.train.station_to}/${booking.train.time_to}/${booking.train.price}/${booking.personal_information.first_name}`)
  }

  return (
    <div className="card-deck">
      <div className="card border-dark mb-3">
        <div className="card-header">Booking Details</div>
        <div className="card-body text-dark">
          <h3 className="card-title text-dark">Personal Details</h3>
          <p className="card-text">
            <b>First Name: </b> {personal_information.first_name}
          </p>
          <p className="card-text">
          <b>Last Name: </b> {personal_information.last_name}
          </p>
          <p className="card-text">
            <b>Email: </b> {personal_information.email}
          </p>
          <p className="card-text">
            <b>Phone:</b> {personal_information.phone_number}
          </p>
          <p></p>
          <h3 className="card-title text-dark">Journey Details</h3>
          <p className="card-text"><b>Price: </b> {train.price}</p>
          <p className="card-text">
            <b>Station From: </b> {train.station_from}
          </p>
          <p className="card-text">
            <b>Time From: </b> {train.time_from}
          </p>
          <p className="card-text">
            <b>Station to:</b> {train.station_to}
          </p>
          <p className="card-text"><b>Time to: </b> {train.time_to}</p>
        </div>
        <Button key={personal_information.first_name} onClick={() => deleteBooking(personal_information.first_name)}>Delete Booking</Button>
        <Button onClick={() => updateBooking(props.booking)}>Update Personal Information</Button>
      </div>
    </div>
  );
};

export default BookingCard;
