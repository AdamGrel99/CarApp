import { useState } from "react";
import { login } from "../Features/Auth/authSlice";
import { useAppDispatch } from "../app/hooks";
import { loginApi } from "../Features/Auth/authApi";
import { Link, useNavigate } from "react-router-dom";
import {
  Button,
  Container,
  Form,
  Header,
  Message,
  Segment,
} from "semantic-ui-react";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState<string | null>(null);

  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const handleSubmit = async () => {
    try {
      const response = await loginApi(email, password);
      dispatch(
        login({ token: response.token, displayName: response.displayName })
      );
      setError(null);
      navigate("/cars");
    } catch (err) {
      setError("Nie poprawny Email lub Hasło");
    }
  };

  return (
    <Container
      text
      style={{
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        flexDirection: "column",
      }}
    >
      <Segment padded style={{ minWidth: "25em" }}>
        <Header as="h2" textAlign="center" color="black">
          Logowanie
        </Header>
        <Form onSubmit={handleSubmit} error={!!error}>
          <Form.Input
            icon="mail"
            iconPosition="left"
            label="Email"
            placeholder="Enter your email"
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <Form.Input
            icon="lock"
            iconPosition="left"
            label="Password"
            placeholder="Enter your password"
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          <Button primary type="submit" fluid>
            Login
          </Button>
          {error && <Message error content={error} />}
        </Form>
        <p style={{ marginTop: "1em", textAlign: "center" }}>
          Nie masz konta? <Link to="/register">Rejestracja</Link>.
        </p>
      </Segment>
    </Container>
  );
}
