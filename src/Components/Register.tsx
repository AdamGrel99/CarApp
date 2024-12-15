import { useState } from "react";
import { Link } from "react-router-dom";
import {
  Button,
  Container,
  Form,
  Header,
  Message,
  Segment,
} from "semantic-ui-react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

export default function Register() {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
    displayName: "",
    userName: "",
  });
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setLoading(true);

    try {
      const response = await axios.post(
        "https://localhost:7072/api/account/register",
        formData
      );
      if (response.data) {
        navigate("/login");
      }
    } catch (err: any) {
      setError(err.response?.data || "Nie spodziewany błąd!");
    } finally {
      setLoading(false);
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
          Rejestracja
        </Header>
        <Form onSubmit={handleSubmit} loading={loading}>
          <Form.Input
            icon="user"
            iconPosition="left"
            label="Nick"
            placeholder="Wpisz imię"
            name="userName"
            value={formData.userName}
            onChange={handleInputChange}
            required
          />
          <Form.Input
            icon="user circle"
            iconPosition="left"
            label="Wyświetlany Nick"
            placeholder="Wpisz Nick"
            name="displayName"
            value={formData.displayName}
            onChange={handleInputChange}
            required
          />
          <Form.Input
            icon="mail"
            iconPosition="left"
            label="Email"
            placeholder="Wpisz maila"
            name="email"
            type="email"
            value={formData.email}
            onChange={handleInputChange}
            required
          />
          <Form.Input
            icon="lock"
            iconPosition="left"
            label="Password"
            placeholder="Wpisz hasło"
            name="password"
            type="password"
            value={formData.password}
            onChange={handleInputChange}
            required
          />
          <Button primary type="submit" fluid>
            Rejestruj
          </Button>
        </Form>
        {error && (
          <Message negative>
            <Message.Header>Błąd w rejestracji!</Message.Header>
            <p>{error}</p>
          </Message>
        )}
        <p style={{ marginTop: "1em", textAlign: "center" }}>
          Masz już konto? <Link to="/login">Logowanie</Link>.
        </p>
      </Segment>
    </Container>
  );
}
