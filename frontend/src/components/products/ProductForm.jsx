import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";
import server from "../../server";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowLeft } from "@fortawesome/free-solid-svg-icons";

function ProductForm(props) {
  const navigate = useNavigate();
  const { id } = useParams();

  // state for existing data
  const [existingProduct, setExistingProduct] = useState(null);
  const [formData, setFormData] = useState({
    name: "",
    category: "",
    image: "",
    mrp: 0.0,
    status: "pending",
    packSize: "",
  });

  // first get all categories from category
  const [categories, setCategories] = useState([]);

  useEffect(() => {
    const fetchCategories = async () => {
      axios
        .get(`${server}/categories`)
        .then((result) => {
          setCategories(result.data);
          console.log(result.data);
        })
        .catch((err) => {
          console.log("error finding data: " + err);
        });
    };
    const fetchProduct = async () => {
      axios
        .get(`${server}/product/${id}`)
        .then((response) => {
          console.log(response.data);
          setFormData(response.data);
          setExistingProduct(response.data);
        })
        .catch((err) => {
          console.log(`error: ${err}`);
        });
    };
    if (props.formType === "new") {
      fetchCategories();
    } else if (props.formType === "edit") {
      fetchProduct();
    }
  }, [id]);

  const handleChange = (e) => {
    const { id, value } = e.target;
    setFormData((dataGiven) => ({
      ...dataGiven,
      [id]: value,
    }));
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    const config = { header: { "Content-Type": "application/json" } };
    if (props.formType === "new") {
      axios
        .post(`${server}/product`, formData, config)
        .then(() => {
          console.log("data added successfully");
          navigate("/product-table");
        })
        .catch((error) => {
          console.log("message: " + error);
        });
    } else if (props.formType === "edit") {
      axios
        .put(`${server}/product/${id}`, formData, config)
        .then(() => {
          console.log("data updated successfully");
          navigate("/product-table");
        })
        .catch((error) => {
          console.log("message: " + error);
        });
    }
  };

  const goBack = () => {
    navigate("/product-table");
    console.log("go back to product table");
  };

  return (
    <div
      className="d-flex flex-column p-3 m-3 shadow"
      style={{ width: "100vw", height: "100vh" }}
    >
      <div className="d-flex justify-content-end">
        <button className="btn btn-dark" onClick={goBack}>
          <FontAwesomeIcon icon={faArrowLeft} />
          Go back
        </button>
      </div>
      <h1>Product form</h1>
      <form onSubmit={handleSubmit}>
        <div className="d-flex flex-row justify-content-around">
          <div>
            <label htmlFor="category">Category: </label>
            {console.log(
              "category: " +
                formData.category +
                " " +
                (props.formType === "edit")
            )}
            <select name="category" id="category" onChange={handleChange}>
              <option
                value={
                  props.formType === "edit" ? formData.category : undefined
                }
                hidden={!(props.formType === "edit")}
              >
                {formData.category}
              </option>
              {categories.map((category) => (
                <option value={category.name}>{category.name}</option>
              ))}
            </select>
          </div>
          <div>
            <label htmlFor="name">Product name: </label>
            <input
              type="text"
              id="name"
              value={props.formType === "edit" ? formData.name : undefined}
              onChange={handleChange}
            />
          </div>
          <div>
            <label htmlFor="packSize">Pack Size: </label>
            <input
              type="text"
              id="packSize"
              value={props.formType === "edit" ? formData.packSize : undefined}
              onChange={handleChange}
            />
          </div>
          <div>
            <label htmlFor="mrp">MRP: </label>
            <input
              type="text"
              id="mrp"
              value={props.formType === "edit" ? formData.mrp : undefined}
              onChange={handleChange}
            />
          </div>
          <div>
            <label htmlFor="image">Image: </label>
            <input
              type="text"
              id="image"
              value={props.formType === "edit" ? formData.image : undefined}
              onChange={handleChange}
            />
          </div>
          <div>
            <label htmlFor="status">Status: </label>
            <select
              name="status"
              id="status"
              value={props.formType === "edit" ? formData.status : undefined}
              onChange={handleChange}
            >
              <option value="default" hidden="true"></option>
              <option value="active">Active</option>
              <option value="inactive">Inactive</option>
            </select>
          </div>
        </div>

        <div className="d-flex justify-content-end m-4">
          <button
            className="btn btn-danger rounded-pill"
            onClick={() => {
              navigate("/product-table");
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

export default ProductForm;
