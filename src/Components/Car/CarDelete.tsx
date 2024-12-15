import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Message } from "semantic-ui-react";

interface CarDeleteProps {
  isSuccess: boolean;
  message: string;
}

export default function CarDelete({ isSuccess, message }: CarDeleteProps) {
  const navigate = useNavigate();

  useEffect(() => {
    const timer = setTimeout(() => {
      navigate("/cars");
    }, 2000); // Przekierowanie po 2 sekundach

    return () => clearTimeout(timer); // Czyszczenie timera przy odmontowaniu
  }, [navigate]);

  return isSuccess ? (
    <Message
      positive
      style={{
        marginTop: "4em",
      }}
    >
      <Message.Header>Pomyślnie</Message.Header>
      <p>{message}</p>
    </Message>
  ) : (
    <Message
      negative
      style={{
        marginTop: "4em",
      }}
    >
      <Message.Header>Error</Message.Header>
      <p>{message}</p>
    </Message>
  );
}
