import { useState, useEffect } from "react";
import axios from "axios";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.bundle";
import BookingCard from "./BookingsCard";
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

/** 
   * *
   * Loads an array of bookings and displays them as cards for the user to see each booking
   * 
   *  @returns array of booking cards */

const Bookings = () => {
  const api = "http://localhost:3899/booking/get";
  const [bookings, setBookings] = useState<Array<Booking>>();

  useEffect(() => {
    loadBooking();
  }, []);

  /**
   * *
   * Loads bookings.
   *
   *  @returns booking array */
  const loadBooking = () => {
    axios
      .get(api)
      .then((response) => {
        setBookings(response.data.booking);
      })
      .catch((error) => console.log("unable to load data"));
  };

  return (
    <div className="card-deck">
      <>
        {bookings ? (
          bookings?.map((booking) => (
            <BookingCard
              key={booking.personal_information._id}
              booking={booking}
            />
          ))
        ) : (
          <p>loading</p>
        )}
      </>
    </div>
  );
};

export default Bookings;
