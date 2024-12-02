import {
  Button,
  Card,
  Container,
  Grid,
  Header,
  Message,
} from "semantic-ui-react";
import { Car } from "../../Models/Car";
import LoadingIndicator from "../LoadingIndicator";
import { NavLink } from "react-router-dom";

export default function CarList({
  cars,
  loading,
  error,
}: {
  cars: Car[];
  loading: boolean;
  error: string | null;
}) {
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
