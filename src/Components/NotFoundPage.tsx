import React from "react";
import { Container, Header, Icon, Button } from "semantic-ui-react";
import { Link } from "react-router-dom";

export default function NotFoundPage() {
  return (
    <Container textAlign="center" style={{ marginTop: "10vh" }}>
      <Icon name="exclamation triangle" size="huge" color="red" />
      <Header as="h1" style={{ fontSize: "3em", margin: "20px 0" }}>
        404 - Page Not Found
      </Header>
      <p style={{ fontSize: "1.2em", color: "#555" }}>
        Przepraszamy, ale podana strona nie istnieje.
      </p>
      <Button
        as={Link}
        to="/"
        color="blue"
        size="large"
        style={{ marginTop: "20px" }}
      >
        Powrót
      </Button>
    </Container>
  );
}
