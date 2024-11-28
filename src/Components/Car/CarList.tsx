import { useEffect, useState } from "react";
import axios from "axios";
import { Car } from "../../Models/Car";
import {
  Card,
  Grid,
  Container,
  Header,
  Button,
  Message,
} from "semantic-ui-react";
import { NavLink } from "react-router-dom";
import LoadingIndicator from "../LoadingIndicator";

export default function CarList() {
  const [cars, setCars] = useState<Car[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  const fetchCars = async () => {
    try {
      const response = await axios.get<Car[]>(
        "https://localhost:7072/api/cars"
      );
      setCars(response.data);
    } catch (err) {
      setError("Error fetching cars");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchCars();
  }, []);

  if (loading) return <LoadingIndicator />;
  if (error)
    return (
      <Message
        error
        header="Error"
        content={error}
        style={{
          marginTop: "4em",
        }}
      />
    );

  return (
    <Container
      style={{
        marginTop: "2em",
        width: "90%",
      }}
    >
      <Header
        as="h1"
        textAlign="center"
        style={{
          marginBottom: "30px",
        }}
      >
        Lista Samochodów
      </Header>
      <Grid stackable columns={1}>
        {cars.map((car) => (
          <Grid.Column key={car.id}>
            <Card
              fluid
              style={{
                boxShadow: "0 4px 8px rgba(0,0,0,0.1)",
                borderRadius: "10px",
                marginBottom: "20px",
              }}
            >
              <Card.Content
                style={{
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "space-between",
                  width: "100%",
                }}
              >
                <Card.Header
                  style={{
                    fontSize: "1.5em",
                    color: "#2c3e50",
                    margin: 0,
                  }}
                >
                  {car.brand} {car.model}
                </Card.Header>
                <Button
                  as={NavLink}
                  to={`/cars/${car.id}`}
                  color="blue"
                  style={{
                    margin: "0 0 0 auto",
                    borderRadius: "20px",
                    padding: "10px 20px",
                    fontWeight: "bold",
                    transition:
                      "background-color 0.3s ease, transform 0.3s ease",
                    boxShadow: "0 4px 6px rgba(0, 0, 0, 0.1)",
                  }}
                >
                  Szczegóły
                </Button>
              </Card.Content>
            </Card>
          </Grid.Column>
        ))}
      </Grid>
    </Container>
  );
}
