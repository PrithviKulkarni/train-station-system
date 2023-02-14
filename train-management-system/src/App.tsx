import React from "react";
import { Route, Routes } from "react-router-dom";
import Footer from "./components/Footer";
import SearchTrains from "./components/SearchTrains";
import Header from "./components/Header";
import 'bootstrap/dist/css/bootstrap.min.css';
import Bookings from './components/Bookings';
import Confirmation from './components/Confirmation';

function App() {
  return (
    <div className="App">
      <Header/>
      <Routes>
        <Route path="/" element={<SearchTrains />} />
        <Route path="/home" element={<SearchTrains />} />
        <Route path="/booking" element={<Bookings />} />
        <Route path="/confirmation/:station_from/:time_from/:station_to/:time_to/:price" element={<Confirmation />} />
        <Route path="/confirmationUpdate/:station_from/:time_from/:station_to/:time_to/:price/:name" element={<Confirmation />} />
      </Routes>
      <Footer/>
    </div>
  );
}

export default App;
