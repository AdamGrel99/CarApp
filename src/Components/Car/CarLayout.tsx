import { useEffect, useState } from "react";
import axios from "axios";
import { Button } from "semantic-ui-react";
import { NavLink, Outlet, useParams } from "react-router-dom";
import CarList from "./CarList";
import "./CarLayout.css";
import { Car } from "../../Models/Car";

export default function CarLayout() {
  const [cars, setCars] = useState<Car[]>([]); // Stan dla listy samochodów
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  const fetchCars = async () => {
    try {
      setLoading(true);
      const response = await axios.get<Car[]>(
        "https://localhost:7072/api/cars"
      );
      setCars(response.data);
    } catch (err) {
      setError("Błąd przy pobieraniu Samochodu.");
    } finally {
      setLoading(false);
    }
  };

  const removeCar = async (id: string): Promise<boolean> => {
    try {
      await axios.delete(`https://localhost:7072/api/cars/${id}`);
      setCars((prevCars) => prevCars.filter((car) => car.id !== id));
      return true;
    } catch (err) {
      setError("Błąd przy usuwaniu Samochodu");
      return false;
    }
  };

  useEffect(() => {
    fetchCars();
  }, []);

  return (
    <div className="car-layout">
      <div className="car-list">
        <Button
          as={NavLink}
          to={`/create`}
          color="green"
          className="car-create"
        >
          Dodaj
        </Button>
        <CarList cars={cars} loading={loading} error={error} />
      </div>
      <div className="car-detail">
        <Outlet context={{ removeCar }} />
      </div>
    </div>
  );
}
