import { useEffect, useState } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";
import { Message } from "semantic-ui-react";
import LoadingIndicator from "../LoadingIndicator";

export default function CarDelete() {
  const [loading, setLoading] = useState<boolean>(true);
  const [successMessage, setSuccessMessage] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);

  let { id } = useParams();

  useEffect(() => {
    const deleteCar = async () => {
      try {
        await axios.delete(`https://localhost:7072/api/cars/${id}`);
        setSuccessMessage("Samochód usunięty!");
      } catch (err) {
        setError("Wystąpił błąd przy usuwaniu Samochodu.");
      } finally {
        setLoading(false);
      }
    };

    deleteCar();
  }, []);

  if (loading) return <LoadingIndicator />;

  return successMessage ? (
    <Message
      positive
      style={{
        marginTop: "4em",
      }}
    >
      <Message.Header>Pomyślnie</Message.Header>
      <p>{successMessage}</p>
    </Message>
  ) : (
    <Message
      negative
      style={{
        marginTop: "4em",
      }}
    >
      <Message.Header>Error</Message.Header>
      <p>{error}</p>
    </Message>
  );
}
