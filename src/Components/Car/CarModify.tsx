import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { Car, FuelType, BodyType } from "../../Models/Car"; // zakładam, że modele są w pliku models.ts
import axios from "axios";

export default function CarForm() {
  const [car, setCar] = useState<Car | null>(null); // Stan przechowujący dane auto
  const [loading, setLoading] = useState(true); // Stan ładowania danych
  const [error, setError] = useState<string | null>(null);

  let { id } = useParams();

  useEffect(() => {
    const fetchCarById = async () => {
      try {
        const response = await axios.get(
          `https://localhost:7072/api/cars/${id}`
        );
        setCar(response.data);
      } catch (err) {
        setError("Error fetching cars");
      } finally {
        setLoading(false);
      }
    };

    fetchCarById();
  }, []);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    if (car) {
      const { name, value } = e.target;
      setCar({
        ...car,
        [name]: value,
      });
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (car) {
      // Zapisujemy zmiany auta (tutaj np. wywołanie API lub zapis do stanu globalnego)
      await axios.put(`https://localhost:7072/api/cars/${id}`, car);
      console.log("Updated Car:", car);
    }
  };

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error}</div>;

  return car ? (
    <form onSubmit={handleSubmit}>
      <div>
        <label>Brand:</label>
        <input
          type="text"
          name="brand"
          value={car.brand}
          onChange={handleChange}
        />
      </div>

      <div>
        <label>Model:</label>
        <input
          type="text"
          name="model"
          value={car.model}
          onChange={handleChange}
        />
      </div>

      <div>
        <label>Doors Number:</label>
        <input
          type="number"
          name="doorsNumber"
          value={car.doorsNumber}
          onChange={handleChange}
        />
      </div>

      <div>
        <label>Luggage Capacity (liters):</label>
        <input
          type="number"
          name="luggageCapacity"
          value={car.luggageCapacity}
          onChange={handleChange}
        />
      </div>

      <div>
        <label>Engine Capacity (cc):</label>
        <input
          type="number"
          name="engineCapacity"
          value={car.engineCapacity}
          onChange={handleChange}
        />
      </div>

      <div>
        <label>Fuel Type:</label>
        <select name="fuelType" value={car.fuelType} onChange={handleChange}>
          {Object.values(FuelType).map((fuel) => (
            <option key={fuel} value={fuel}>
              {fuel}
            </option>
          ))}
        </select>
      </div>

      <div>
        <label>Production Date:</label>
        <input
          type="date"
          name="productionDate"
          value={car.productionDate.slice(0, 10)} // Skracamy ISO string do formatu yyyy-MM-dd
          onChange={handleChange}
        />
      </div>

      <div>
        <label>Fuel Consumption (L/100km):</label>
        <input
          type="number"
          name="carFuelConsumption"
          value={car.carFuelConsumption}
          onChange={handleChange}
        />
      </div>

      <div>
        <label>Body Type:</label>
        <select name="bodyType" value={car.bodyType} onChange={handleChange}>
          {Object.values(BodyType).map((body) => (
            <option key={body} value={body}>
              {body}
            </option>
          ))}
        </select>
      </div>

      <button type="submit">Save</button>
    </form>
  ) : (
    <div>No car data available</div>
  );
}
