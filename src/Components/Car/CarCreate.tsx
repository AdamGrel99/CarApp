import React, { useState } from "react";
import axios from "axios";
import { Car, FuelType } from "../../Models/Car";
import { Form, Button, Message } from "semantic-ui-react";

export default function CarCreate() {
  const [formData, setFormData] = useState({
    brand: "",
    model: "",
    doorsNumber: "",
    luggageCapacity: "",
    engineCapacity: "",
    fuelType: "",
    productionDate: "",
    carFuelConsumption: "",
    bodyType: "",
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [successMessage, setSuccessMessage] = useState("");
  const [errorMessage, setErrorMessage] = useState("");

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsSubmitting(true);
    setSuccessMessage("");
    setErrorMessage("");

    const payload = {
      Brand: formData.brand,
      Model: formData.model,
      DoorsNumber: formData.doorsNumber,
      LuggageCapacity: formData.luggageCapacity,
      EngineCapacity: formData.engineCapacity,
      FuelType: Number(formData.fuelType),
      ProductionDate: formData.productionDate,
      CarFuelConsumption: formData.carFuelConsumption,
      BodyType: Number(formData.bodyType),
    };

    try {
      await axios.post("https://localhost:7072/api/cars", payload);
      setSuccessMessage("Car data successfully submitted!");
      setFormData({
        brand: "",
        model: "",
        doorsNumber: "",
        luggageCapacity: "",
        engineCapacity: "",
        fuelType: "",
        productionDate: "",
        carFuelConsumption: "",
        bodyType: "",
      });
    } catch (error) {
      if (axios.isAxiosError(error)) {
        setErrorMessage(
          error.response?.data?.message || "Something went wrong!"
        );
      } else {
        setErrorMessage("An unexpected error occurred!");
      }
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <Form
      onSubmit={handleSubmit}
      success={!!successMessage}
      error={!!errorMessage}
    >
      <Form.Input
        label="Brand"
        name="brand"
        value={formData.brand}
        onChange={handleChange}
        placeholder="Enter car brand"
        required
      />
      <Form.Input
        label="Model"
        name="model"
        value={formData.model}
        onChange={handleChange}
        placeholder="Enter car model"
        required
      />
      <Form.Input
        label="Number of Doors"
        name="doorsNumber"
        type="number"
        value={formData.doorsNumber}
        onChange={handleChange}
        placeholder="Enter number of doors"
        required
      />
      <Form.Input
        label="Engine Capacity (cc)"
        name="engineCapacity"
        type="number"
        value={formData.engineCapacity}
        onChange={handleChange}
        placeholder="Enter engine capacity"
        required
      />
      <Form.Input
        label="Luggage Capacity"
        name="luggageCapacity"
        type="number"
        value={formData.luggageCapacity}
        onChange={handleChange}
        placeholder="Enter luggage capacity"
        required
      />
      <Form.Input
        label="Fuel Type"
        name="fuelType"
        value={formData.fuelType}
        onChange={handleChange}
        placeholder="Enter fuel type"
        required
      />
      <Form.Input
        label="Production Date"
        name="productionDate"
        type="date"
        value={formData.productionDate}
        onChange={handleChange}
        required
      />
      <Form.Input
        label="Fuel Consumption"
        name="carFuelConsumption"
        type="number"
        value={formData.carFuelConsumption}
        onChange={handleChange}
        required
      />
      <Form.Input
        label="Body Type"
        name="bodyType"
        type="number"
        value={formData.bodyType}
        onChange={handleChange}
        required
      />
      <Button type="submit" primary loading={isSubmitting}>
        Submit
      </Button>

      <Message success header="Success" content={successMessage} />
      <Message error header="Error" content={errorMessage} />
    </Form>
  );
}
