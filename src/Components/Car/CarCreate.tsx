import React, { useState } from "react";
import axios from "axios";
import { Car, FuelType, BodyType } from "../../Models/Car";
import { Form, Button, Message } from "semantic-ui-react";
import BackButton from "../BackButton";

export default function CarCreate() {
  const [car, setCar] = useState<Omit<Car, "id">>({
    brand: "",
    model: "",
    doorsNumber: 0,
    luggageCapacity: 0,
    engineCapacity: 0,
    fuelType: FuelType.Petrol,
    productionDate: "",
    carFuelConsumption: 0,
    bodyType: BodyType.Hatchback,
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [successMessage, setSuccessMessage] = useState("");
  const [errorMessage, setErrorMessage] = useState("");

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;

    setCar((prev) => ({
      ...prev,
      [name]:
        name === "doorsNumber" ||
        name === "engineCapacity" ||
        name === "carFuelConsumption" ||
        name === "luggageCapacity"
          ? parseFloat(value) || 0
          : value,
    }));
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsSubmitting(true);
    setSuccessMessage("");
    setErrorMessage("");

    const payload = {
      ...car,
      fuelType: Object.values(FuelType).indexOf(car.fuelType),
      bodyType: Object.values(BodyType).indexOf(car.bodyType),
    };

    try {
      await axios.post("https://localhost:7072/api/cars", payload);
      setSuccessMessage("Utworzono Samochód!");
      setCar({
        brand: "",
        model: "",
        doorsNumber: 0,
        luggageCapacity: 0,
        engineCapacity: 0,
        fuelType: FuelType.Petrol,
        productionDate: "",
        carFuelConsumption: 0,
        bodyType: BodyType.Hatchback,
      });
    } catch (error) {
      if (axios.isAxiosError(error)) {
        setErrorMessage(error.response?.data?.message || "Coś poszło nie tak!");
      } else {
        setErrorMessage("Błąd z utworzeniem Samochodu.");
      }
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div>
      <BackButton to="/cars" style={{ marginLeft: "70%" }}></BackButton>
      <Form
        onSubmit={handleSubmit}
        success={!!successMessage}
        error={!!errorMessage}
        style={{ maxWidth: "600px", margin: "0 auto" }}
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
          value={car.fuelType}
          options={Object.values(FuelType).map((type) => ({
            key: type,
            value: type,
            text: type,
          }))}
          onChange={(e, { name, value }) =>
            setCar((prev) => ({
              ...prev,
              [name!]: value,
            }))
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
          value={car.bodyType}
          options={Object.values(BodyType).map((type) => ({
            key: type,
            value: type,
            text: type,
          }))}
          onChange={(e, { name, value }) =>
            setCar((prev) => ({
              ...prev,
              [name!]: value,
            }))
          }
          placeholder="Select body type"
          required
        />
        <Button type="submit" color="green" fluid loading={isSubmitting}>
          Dodaj
        </Button>

        <Message success header="Success" content={successMessage} />
        <Message error header="Error" content={errorMessage} />
      </Form>
    </div>
  );
}
