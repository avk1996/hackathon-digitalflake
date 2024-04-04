import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import server from "../../server";

function CreateCategory() {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    name: "",
    description: "",
    status: "pending",
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.id]: e.target.value });
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    console.log(`Data saved: ${formData}`);
    const config = { header: { "Content-Type": "application/json" } };
    axios
      .post(`${server}/category`, formData, config)
      .then(() => {
        console.log("data added successfully");
        navigate("/category-table");
      })
      .catch((error) => {
        console.log("message: " + error);
      });
  };

  const goBack = () => {
    navigate("/category-table");
    console.log("set go back navigation");
  };
  return (
    <div>
      <div className="d-flex justify-content-end">
        <button className="btn btn-dark" onClick={goBack}>
          Go back
        </button>
      </div>
      <form onSubmit={handleSubmit}>
        <div className="d-flex flex-row justify-content-around">
          <div>
            <label htmlFor="name">Category name: </label>
            <input type="text" id="name" onChange={handleChange} />
          </div>
          <div>
            <label htmlFor="description">Description: </label>
            <input type="text" id="description" onChange={handleChange} />
          </div>
          <div>
            <label htmlFor="status">Status: </label>
            {/* <input type="text" id="status" onChange={handleChange} /> */}
            <select name="status" id="status" onChange={handleChange}>
              <option value="default" hidden="true"></option>
              <option value="active">Active</option>
              <option value="inactive">Inactive</option>
            </select>
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

export default CreateCategory;
