import { Link } from "react-router-dom";
import { Button, Container, Header, Icon, Segment } from "semantic-ui-react";

export default function Info() {
  return (
    <Container
      style={{
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        flexDirection: "column",
      }}
    >
      <Segment style={{ maxWidth: "700px" }}>
        <Header
          as="h1"
          style={{ color: "black", textAlign: "center", fontSize: "2.5rem" }}
        >
          Odkryj świat samochodów na nowo.
        </Header>
        <p
          style={{
            fontSize: "1.1em",
            margin: "2em 7em 1em 7em",
            color: "grey",
          }}
        >
          Logując się lub rejestrując, zyskujesz dostęp do ekskluzywnych treści,
          spersonalizowanych rekomendacji oraz szczegółowych specyfikacji
          samochodów dopasowanych do Twoich zainteresowań.
        </p>
        <p
          style={{
            fontSize: "1.1em",
            margin: "1em 7em 2em 7em",
            color: "grey",
          }}
        >
          Nie przegap okazji, aby być na bieżąco ze światem motoryzacyjnym.
          Dołącz do naszej społeczności już dziś!
        </p>
        <div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            flexDirection: "column",
          }}
        >
          <Button
            as={Link}
            to="/login"
            primary
            size="large"
            style={{ width: "10em", padding: "10px", margin: "5px" }}
          >
            <Icon name="sign-in" /> Logowanie
          </Button>
          <Button
            as={Link}
            to="/register"
            secondary
            size="large"
            style={{ width: "10em", padding: "10px", margin: "5px" }}
          >
            <Icon name="signup" /> Rejestracja
          </Button>
        </div>
      </Segment>
    </Container>
  );
}
