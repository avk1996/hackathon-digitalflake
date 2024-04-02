import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import server from "../../server";

function CreateProduct() {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    name: "",
    category: "",
    image: "",
    mrp: 0.0,
    status: "pending",
    packSize: "",
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.id]: e.target.value });
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    const config = { header: { "Content-Type": "application/json" } };
    axios
      .post(`${server}/product`, formData, config)
      .then(() => {
        console.log("data added successfully");
        window.location.reload();
      })
      .catch((error) => {
        console.log("message: " + error);
      });
  };

  const goBack = () => {
    navigate("/");
    console.log("set go back navigation");
  };
  return (
    <div>
      <div className="d-flex justify-content-end">
        <button className="btn btn-dark" onClick={goBack}>
          Go back
        </button>
      </div>
      <h1>Product form</h1>
      <form onSubmit={handleSubmit}>
        <div className="d-flex flex-row justify-content-around">
          <div>
            <label htmlFor="name">Product name: </label>
            <input type="text" id="name" onChange={handleChange} />
          </div>
          <div>
            <label htmlFor="category">Category: </label>
            <input type="text" id="category" onChange={handleChange} />
          </div>
          <div>
            <label htmlFor="packSize">Pack Size: </label>
            <input type="text" id="packSize" onChange={handleChange} />
          </div>
          <div>
            <label htmlFor="mrp">MRP: </label>
            <input type="text" id="mrp" onChange={handleChange} />
          </div>
          <div>
            <label htmlFor="image">Image: </label>
            <input type="text" id="image" onChange={handleChange} />
          </div>
          <div>
            <label htmlFor="status">Status: </label>
            <input type="text" id="status" onChange={handleChange} />
          </div>
        </div>

        <div className="d-flex flex-end">
          <button className="btn btn-outline-warning rounded-pill border border-dark">
            cancel
          </button>
          &nbsp;
          <button type="submit" className="btn btn-success rounded-pill">
            save
          </button>
        </div>
      </form>
    </div>
  );
}

export default CreateProduct;
