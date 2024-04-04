import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import server from "../../server";

function EditCategory() {
  const navigate = useNavigate();
  const { id } = useParams();

  const [existingData, setExistingData] = useState({});
  const [newData, setNewData] = useState({});
  const [categoryId] = useState(id);

  const handleChange = (e) => {
    const { id, value } = e.target;
    setExistingData((prevData) => ({
      ...prevData,
      [id]: value,
    }));
  };

  useEffect(() => {
    const fetchData = async () => {
      await axios
        .get(`${server}/category/${id}`)
        .then((response) => {
          setNewData(response.data);
          setExistingData(response.data);
          console.log(response.data);
        })
        .catch((error) => {
          console.log("Error: " + error);
        });
    };
    fetchData();
  }, [id]);

  const handleSubmit = (event) => {
    event.preventDefault();
    console.log(`item id accessed: ${event}`);
    const config = { header: { "Content-Type": "application/json" } };
    const updatedCategory = { ...newData, ...existingData };
    axios
      .put(`${server}/category/${categoryId}`, updatedCategory, config)
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
    <div className="d-flex flex-column">
      <div className="d-flex justify-content-end p-3">
        <button className="btn btn-dark" onClick={goBack}>
          Go back
        </button>
      </div>
      <div>
        <form onSubmit={handleSubmit}>
          <div className="d-flex flex-row justify-content-around">
            <div>
              <label htmlFor="name">Category name: </label>
              <input
                type="text"
                id="name"
                value={existingData.name}
                onChange={handleChange}
              />
            </div>
            <div>
              <label htmlFor="description">Description: </label>
              <input
                type="text"
                id="description"
                value={existingData.description}
                onChange={handleChange}
              />
            </div>
          </div>
          <div className="d-flex justify-content-end p-3">
            <button
              className="btn btn-outline-warning rounded-pill border border-dark text-dark"
              onClick={goBack}
            >
              cancel
            </button>
            &nbsp;
            <button type="submit" className="btn btn-success rounded-pill">
              save
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default EditCategory;
