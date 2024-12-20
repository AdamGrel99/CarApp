import { useEffect, useState } from "react";
import { Button } from "semantic-ui-react";
import { NavLink, Outlet } from "react-router-dom";
import CarList from "./CarList";
import "./CarLayout.css";
import { Car } from "../../Models/Car";
import apiClient from "../../app/apiClient";

export default function CarLayout() {
  const [cars, setCars] = useState<Car[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  const fetchCars = async () => {
    try {
      setLoading(true);
      const response = await apiClient.get<Car[]>("/cars");
      setCars(response.data);
    } catch (err) {
      setError("Błąd przy pobieraniu Samochodu.");
    } finally {
      setLoading(false);
    }
  };

  const removeCar = async (id: string): Promise<boolean> => {
    try {
      await apiClient.delete(`/cars/${id}`);
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
