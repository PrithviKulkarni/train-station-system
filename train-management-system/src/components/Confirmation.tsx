import { useState, FormEvent } from "react";
import axios from "axios";
import { useNavigate, useParams } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.bundle";
import "../styles/Background.css"

const Confirmation = () => {
  const api = "http://localhost:3899/booking/createABooking";
  const navigate = useNavigate();
  const params = useParams();
  const [first_name, setFirst_Name] = useState("");
  const [last_name, setLast_Name] = useState("");
  const [email, setEmail] = useState("");
  const [phone_number, setPhone_Number] = useState("");
  const [inv_first_name, setInvFirst_Name] = useState(false);
  const [inv_last_name, setInvLast_Name] = useState(false);
  const [inv_email, setInvEmail] = useState(false);
  const [inv_phone_number, setInvPhone_Number] = useState(false);

  /** 
   * *
   * handles the submit for confirmation and sends a post or patch request to the mongoDB
   * 
   *  @returns post or patch request */

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (first_name === "") {
      setInvFirst_Name(true);
    } else {
      setInvFirst_Name(false);
    }

    if (last_name === "") {
      setInvLast_Name(true);
    } else {
      setInvLast_Name(false);
    }

    if (email === "") {
      setInvEmail(true);
    } else {
      setInvEmail(false);
    }

    if (phone_number === "") {
      setInvPhone_Number(true);
    } else {
      setInvPhone_Number(false);
    }

    if (!inv_first_name && !inv_last_name && !inv_email && !inv_phone_number) {
      const booking = {
        personal_information: {
          first_name: first_name,
          last_name: last_name,
          email: email,
          phone_number: phone_number,
        },
        train: {
          station_from: params.station_from,
          time_from: params.time_from,
          station_to: params.station_to,
          time_to: params.time_to,
          price: params.price,
        },
      };
      if (params.name) {
        axios
          .patch(
            "http://localhost:3899/booking/updateABooking/" + params.name,
            booking
          )
          .then((response) => navigate("/booking"))
          .catch((err) => console.log("couldn't create object"));
      } else {
        axios
          .post(api, booking)
          .then((response) => navigate("/booking"))
          .catch((err) => console.log("couldn't create object"));
      }
    }
  };

  /** 
   * *
   * returns the information typed in by user
   * 
   *  @returns users personal information */
  return (
    
    <div className="form">
      <br></br>
      <br></br>
      <br></br>
    <h1>Registration</h1>
    <form className="form" onSubmit={handleSubmit}>
      <div className="form-group">
        <label form="first-name"></label>
        <input
          type="text"
          name="first_name" placeholder="First Name"
          value={first_name}
          onChange={(event) => setFirst_Name(event.target.value)}
        />
        {inv_first_name && (
          <span className="error">First Name Cannot Be Blank</span>
        )}<br></br>
        <label form="last-name"></label>
        <input
          type="text"
          name="last_name" placeholder="Last Name"
          value={last_name}
          onChange={(event) => setLast_Name(event.target.value)}
        />
        {inv_last_name && (
          <span className="error">Last Name Cannot Be Blank</span>
        )}<br></br>
        <label form="email"></label>
        <input
          type="text"
          name="email" placeholder="Email Address"
          value={email}
          onChange={(event) => setEmail(event.target.value)}
        />
        {inv_email && <span className="error">Email Cannot Be Blank</span>}<br></br>
        <label form="phone-number"></label>
        <input
          type="text"
          name="phone_number" placeholder="Phone Number"
          value={phone_number}
          onChange={(event) => setPhone_Number(event.target.value)}
        />
        {inv_phone_number && (
          <span className="error">Phone Number Cannot Be Blank</span>
        )}<br></br>
      </div>
      <div>
      <br></br>
        <button type="submit" className="btn btn-primary">
          Submit
        </button>
      </div>
    </form>
  </div>
  );
};

export default Confirmation;
