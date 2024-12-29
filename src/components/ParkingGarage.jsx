import React, { useState } from "react";
import styles from "./ParkingGarage.module.css";
import "bootstrap/dist/css/bootstrap.min.css";

const ParkingGarage = () => {
  const [garage, setGarage] = useState([]);
  const [arrivals, setArrivals] = useState(0);
  const [departures, setDepartures] = useState(0);
  const [plateNumber, setPlateNumber] = useState("");
  const [mode, setMode] = useState("a");
  const maxCapacity = 10;

  const handleArrival = () => {
    if (garage.length < maxCapacity) {
      setGarage([...garage, plateNumber]);
      setArrivals(arrivals + 1);
      setPlateNumber("");
    } else {
      alert("Garage is full! No more cars can be parked.");
    }
  };

  const handleDeparture = () => {
    if (garage.includes(plateNumber)) {
      const carIndex = garage.indexOf(plateNumber);
      const newGarage = [...garage];
      newGarage.splice(carIndex, 1);
      setGarage(newGarage);
      setDepartures(departures + 1);
      setPlateNumber("");
    } else {
      alert("Car not found in the garage!");
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (mode === "a") {
      handleArrival();
    } else if (mode === "d") {
      handleDeparture();
    }
  };

  return (
    <div className={`${styles.container} container text-center mt-4`}>
      <h1 className="mb-4">PUP-CEA Parking Garage</h1>
      <form onSubmit={handleSubmit} className="mb-3">
        <div className="row justify-content-center">
          <div className="col-md-4">
            <input
              type="text"
              className="form-control"
              placeholder="Enter plate number"
              value={plateNumber}
              onChange={(e) => setPlateNumber(e.target.value)}
              required
            />
          </div>
          <div className="col-md-4">
            <select
              className="form-select"
              value={mode}
              onChange={(e) => setMode(e.target.value)}
            >
              <option value="a">Arrival</option>
              <option value="d">Departure</option>
            </select>
          </div>
          <div className="col-md-2">
            <button type="submit" className="btn btn-primary w-100">
              Submit
            </button>
          </div>
        </div>
      </form>
      <div className={`${styles.garageStatus} mb-4`}>
        <h4>Garage Status</h4>
        <ul className={`${styles.list} list-group`}>
          {garage.length === 0 ? (
            <li className="list-group-item">Garage is empty.</li>
          ) : (
            garage.map((car, index) => (
              <li key={index} className="list-group-item">
                {index + 1}. {car}
              </li>
            ))
          )}
        </ul>
      </div>
      <div className="row">
        <div className="col-md-6">
          <h5>Total Arrivals: {arrivals}</h5>
        </div>
        <div className="col-md-6">
          <h5>Total Departures: {departures}</h5>
        </div>
      </div>
    </div>
  );
};

export default ParkingGarage;
    