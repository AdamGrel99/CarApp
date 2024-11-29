import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { Car, FuelType, BodyType } from "../../Models/Car";
import axios from "axios";
import { Form, Button, Message } from "semantic-ui-react";
import LoadingIndicator from "../LoadingIndicator";
import BackButton from "../BackButton";

export default function CarModify() {
  const [car, setCar] = useState<Omit<Car, "id"> | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [successMessage, setSuccessMessage] = useState<string | null>(null);

  let { id } = useParams();

  const fuelTypeOptions = Object.values(FuelType).map((type, index) => ({
    key: index,
    value: index,
    text: type,
  }));

  const bodyTypeOptions = Object.values(BodyType).map((type, index) => ({
    key: index,
    value: index,
    text: type,
  }));

  useEffect(() => {
    const fetchCarById = async () => {
      try {
        const response = await axios.get(
          `https://localhost:7072/api/cars/${id}`
        );
        const fetchedCar = response.data;
        setCar({
          ...fetchedCar,
          fuelType: Object.values(FuelType)[fetchedCar.fuelType],
          bodyType: Object.values(BodyType)[fetchedCar.bodyType],
        });
      } catch (error) {
        setError("Error fetching car data.");
      } finally {
        setLoading(false);
      }
    };

    fetchCarById();
  }, [id]);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    if (car) {
      const { name, value } = e.target;
      setCar({
        ...car,
        [name]:
          name === "doorsNumber" ||
          name === "engineCapacity" ||
          name === "carFuelConsumption" ||
          name === "luggageCapacity"
            ? parseFloat(value) || 0
            : value,
      });
    }
  };

  const handleSelectChange = (
    name: keyof Omit<Car, "id">,
    value: string | number
  ) => {
    if (car) {
      setCar({
        ...car,
        [name]: value,
      });
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (car) {
      try {
        setSuccessMessage(null);
        setError(null);

        const payload = {
          ...car,
          fuelType: Object.values(FuelType).indexOf(car.fuelType),
          bodyType: Object.values(BodyType).indexOf(car.bodyType),
        };

        await axios.put(`https://localhost:7072/api/cars/${id}`, payload);
        setSuccessMessage("Zaktualizowano Samochód.");
      } catch (error) {
        setError("Błąd ze zmianą wartości.");
      }
    }
  };

  if (loading) return <LoadingIndicator />;

  return car ? (
    <div>
      <BackButton to="/cars" style={{ marginLeft: "70%" }}></BackButton>
      <Form
        onSubmit={handleSubmit}
        style={{ maxWidth: "600px", margin: "0 auto" }}
        success={!!successMessage}
        error={!!error}
      >
        <Form.Input
          label="Brand"
          name="brand"
          value={car.brand}
          onChange={handleChange}
          required
        />
        <Form.Input
          label="Model"
          name="model"
          value={car.model}
          onChange={handleChange}
          required
        />
        <Form.Input
          label="Number of Doors"
          name="doorsNumber"
          type="number"
          value={car.doorsNumber}
          onChange={handleChange}
          required
        />
        <Form.Input
          label="Engine Capacity (cc)"
          name="engineCapacity"
          type="number"
          value={car.engineCapacity}
          onChange={handleChange}
          placeholder="Enter engine capacity"
          required
        />
        <Form.Input
          label="Luggage Capacity"
          name="luggageCapacity"
          type="number"
          value={car.luggageCapacity}
          onChange={handleChange}
          placeholder="Enter luggage capacity"
          required
        />

        <Form.Select
          label="Fuel Type"
          name="fuelType"
          value={Object.values(FuelType).indexOf(car.fuelType as FuelType)}
          options={fuelTypeOptions}
          onChange={(e, { value }) =>
            handleSelectChange(
              "fuelType",
              Object.values(FuelType)[value as number]
            )
          }
          required
        />
        <Form.Input
          label="Production Date"
          name="productionDate"
          type="date"
          value={car.productionDate}
          onChange={handleChange}
          required
        />
        <Form.Input
          label="Fuel Consumption"
          name="carFuelConsumption"
          type="number"
          value={car.carFuelConsumption}
          onChange={handleChange}
          required
        />

        <Form.Select
          label="Body Type"
          name="bodyType"
          value={Object.values(BodyType).indexOf(car.bodyType as BodyType)}
          options={bodyTypeOptions}
          onChange={(e, { value }) =>
            handleSelectChange(
              "bodyType",
              Object.values(BodyType)[value as number]
            )
          }
        />

        <Button type="submit" color="green" fluid>
          Zapisz
        </Button>

        {successMessage && (
          <Message success header="Success" content={successMessage} />
        )}
        {error && <Message error header="Error" content={error} />}
      </Form>
    </div>
  ) : (
    <Message error header="Error" content={error} />
  );
}
