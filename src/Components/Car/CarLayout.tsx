import React from "react";
import CarList from "./CarList";
import { Button } from "semantic-ui-react";
import "./CarLayout.css";
import { NavLink, Outlet, useParams } from "react-router-dom";

export default function CarLayout() {
  let { id } = useParams();

  return (
    <div className="car-layout">
      <div className="car-list">
        <Button
          as={NavLink}
          to={`/create`}
          color="green"
          className="car-create"
        >
          Dodaj
        </Button>
        <CarList />
      </div>
      <div className="car-detail">{id && <Outlet />}</div>
    </div>
  );
}
