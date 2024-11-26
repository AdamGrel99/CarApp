import { useEffect, useState } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";

export default function CarDelete() {
  const [loading, setLoading] = useState<boolean>(true);
  const [successMessage, setSuccessMessage] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);

  let { id } = useParams();

  useEffect(() => {
    const deleteCar = async () => {
      try {
        await axios.delete(`https://localhost:7072/api/cars/${id}`);
        setSuccessMessage("Car successfully deleted!");
      } catch (err) {
        setError("An unexpected error occurred.");
      } finally {
        setLoading(false);
      }
    };

    deleteCar();
  }, []);

  if (loading) return <p>Loading...</p>;

  return successMessage ? <p>{successMessage}</p> : <p>Error: {error}</p>;
}
