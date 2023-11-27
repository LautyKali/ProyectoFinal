import React from "react";
import { Link, useNavigate } from "react-router-dom";

export default function NotFound() {
  const navigate = useNavigate();
  document.body.classList = ["NotFound"];
  return (
    <div className="notFound">
      <h1 className="display-4" style={{fontSize:"xxx-large"}}>404 Not found</h1>
      <p className="notFoundp" style={{fontSize:"medium"}}>We are working on this page for you!</p>
      <Link
      style={{fontSize:"medium"}}
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