import React from "react";
import { Link, useNavigate } from "react-router-dom";
import './NotFound.css'

export default function NotFound() {
  const navigate = useNavigate();

  return (
    <div className="notFound">
      <h1 className="display-4">404 Not found</h1>
      <p>We are working on this page for you!</p>
      <Link
        to={".."}
        onClick={(e) => {
          e.preventDefault();
          navigate(-1);
        }}
        className="btn btn-dark"
      >
        Volver
      </Link>
    </div>
  );
}