import React from "react";
import { useNavigate } from "react-router-dom";
import { Button, Icon } from "semantic-ui-react";

interface BackButtonProps {
  to?: string;
  style?: React.CSSProperties;
}

export default function BackButton({ to = "/", style = {} }: BackButtonProps) {
  const navigate = useNavigate();

  return (
    <Button color="blue" style={style} onClick={() => navigate(to)}>
      <Icon name="arrow left" />
      Wróć
    </Button>
  );
}
