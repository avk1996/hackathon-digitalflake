import React, { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";
import server from "../../server";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowLeft } from "@fortawesome/free-solid-svg-icons";

function CreateCategory(props) {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    name: "",
    description: "",
    status: "",
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.id]: e.target.value });
  };

  const { id } = useParams();

  useEffect(() => {
    const fetchData = async () => {
      await axios
        .get(`${server}/category/${id}`)
        .then((response) => {
          setFormData(response.data);
          console.log(response.data);
        })
        .catch((error) => {
          console.log("Error: " + error);
        });
    };
    if (props.formType === "edit") {
      fetchData();
    }
  }, [id]);

  const handleSubmit = (event) => {
    event.preventDefault();
    console.log(`Data saved: ${formData}`);
    const config = { header: { "Content-Type": "application/json" } };
    if (props.formType === "new") {
      axios
        .post(`${server}/category`, formData, config)
        .then(() => {
          console.log("data added successfully");
          navigate("/category-table");
        })
        .catch((error) => {
          console.log("message: " + error);
        });
    } else if (props.formType === "edit") {
      axios
        .put(`${server}/category/${id}`, formData, config)
        .then(() => {
          console.log("data added successfully");
          navigate("/category-table");
        })
        .catch((error) => {
          console.log("message: " + error);
        });
    }
  };

  const goBack = () => {
    navigate("/category-table");
    console.log("set go back navigation");
  };
  return (
    <div
      className="d-flex flex-column p-3 m-3 shadow"
      style={{ width: "100vw", height: "100vh" }}
    >
      <div className="d-flex justify-content-end">
        <button className="btn btn-dark" onClick={goBack}>
          <FontAwesomeIcon icon={faArrowLeft} /> Go back
        </button>
      </div>
      <form onSubmit={handleSubmit}>
        <div className="d-flex flex-row justify-content-around">
          <div>
            <label htmlFor="name">Category name: </label>
            <input
              type="text"
              id="name"
              value={props.formType === "edit" ? formData.name : undefined}
              onChange={handleChange}
            />
          </div>
          <div>
            <label htmlFor="description">Description: </label>
            <input
              type="text"
              id="description"
              value={
                props.formType === "edit" ? formData.description : undefined
              }
              onChange={handleChange}
            />
          </div>
          <div>
            <label htmlFor="status">Status: </label>
            <select name="status" id="status" onChange={handleChange}>
              <option value="default" hidden={!(props.formType === "edit")}>
                {formData.status}
              </option>
              <option value="active">Active</option>
              <option value="inactive">Inactive</option>
            </select>
          </div>
        </div>

        <div className="d-flex justify-content-end m-4">
          <button
            className="btn btn-danger rounded-pill"
            onClick={() => {
              navigate("/category-table");
            }}
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
  );
}

export default CreateCategory;
