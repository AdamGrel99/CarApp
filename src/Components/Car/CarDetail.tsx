import { useEffect, useState } from "react";
import axios from "axios";
import { Car, FuelType, BodyType } from "../../Models/Car";
import { Card, Header, Button, Icon } from "semantic-ui-react";
import { NavLink, useParams } from "react-router-dom";

export default function CarDetail() {
  const [car, setCars] = useState<Car | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  let { id } = useParams();

  useEffect(() => {
    const fetchCarById = async () => {
      try {
        const response = await axios.get<Car>(
          `https://localhost:7072/api/cars/${id}`
        );
        setCars(response.data);
      } catch (err) {
        setError("Error fetching car");
      } finally {
        setLoading(false);
      }
    };

    fetchCarById();
  }, [id]);

  if (loading) return <p>Loading...</p>;
  if (error) return <p>{error}</p>;

  const getFuelTypeName = (type: number) => {
    switch (type) {
      case 0:
        return FuelType.Petrol;
      case 1:
        return FuelType.Hybrid;
      case 2:
        return FuelType.Diesel;
      case 3:
        return FuelType.LPG;
      default:
        return "Unknown";
    }
  };

  const getBodyTypeName = (type: number) => {
    switch (type) {
      case 0:
        return BodyType.Hatchback;
      case 1:
        return BodyType.Kombi;
      case 2:
        return BodyType.Roadster;
      case 3:
        return BodyType.SUV;
      case 4:
        return BodyType.Sedan;
      default:
        return "Unknown";
    }
  };

  return (
    car && (
      <div
        style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          flexDirection: "column",
          marginTop: "2em",
        }}
      >
        <Header
          as="h1"
          textAlign="center"
          style={{
            marginBottom: "30px",
          }}
        >
          Informacja
        </Header>
        <Card
          style={{
            position: "relative",
            boxShadow: "0 4px 8px rgba(0,0,0,0.1)",
            borderRadius: "10px",
            marginBottom: "20px",
            backgroundColor: "#f4f4f4",
          }}
        >
          <div>
            <Button
              icon
              color="red"
              onClick={() => console.log(car.id)}
              style={{
                position: "absolute",
                top: "-15px",
                right: "-15px",
                boxShadow: "0 2px 4px rgba(0, 0, 0, 0.2)",
                width: "30px",
                height: "30px",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              <Icon name="close" />
            </Button>
          </div>
          <div>
            <Button
              as={NavLink}
              to={`/edit/${car.id}`}
              icon
              color="green"
              onClick={() => console.log(car.id)}
              style={{
                position: "absolute",
                top: "25px",
                right: "-15px",
                boxShadow: "0 2px 4px rgba(0, 0, 0, 0.2)",
                width: "30px",
                height: "30px",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              <Icon name="setting" />
            </Button>
          </div>
          <Card.Content>
            <Card.Header style={{ fontSize: "1.5em", color: "#2c3e50" }}>
              {car.brand} {car.model}
            </Card.Header>
            <Card.Meta style={{ fontSize: "0.9em", color: "#7f8c8d" }}>
              {new Date(car.productionDate).toLocaleDateString()}
            </Card.Meta>
            <Card.Description style={{ marginTop: "10px", lineHeight: "1.6" }}>
              <p>
                <strong>Liczba drzwi:</strong> {car.doorsNumber}
              </p>
              <p>
                <strong>Pojemność bagażnika:</strong> {car.luggageCapacity}{" "}
                litrów
              </p>
              <p>
                <strong>Pojemność silnika:</strong> {car.engineCapacity} cc
              </p>
              <p>
                <strong>Rodzaj paliwa:</strong>{" "}
                {getFuelTypeName(parseInt(car.fuelType))}
              </p>
              <p>
                <strong>Spalanie:</strong> {car.carFuelConsumption} L/100km
              </p>
              <p>
                <strong>Typ nadwozia:</strong>{" "}
                {getBodyTypeName(parseInt(car.bodyType))}
              </p>
            </Card.Description>
          </Card.Content>
        </Card>
      </div>
    )
  );
}
