import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";
import server from "../../server";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowLeft } from "@fortawesome/free-solid-svg-icons";
import toast from "react-hot-toast";

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
          toast.success("data updated successfully");
          navigate("/product-table");
        })
        .catch((error) => {
          console.log("message: " + error);
          toast.error(`Error: ${error}`);
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
          &nbsp; Go back
        </button>
      </div>
      <form onSubmit={handleSubmit}>
        <div className="container">
          <div className="row">
            <div className="col-md-4">
              <label htmlFor="category">Category: </label>
              <select
                name="category"
                id="category"
                className="form-control"
                onChange={handleChange}
              >
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
            <div className="col-md-4">
              <label htmlFor="name">Product name: </label>
              <input
                type="text"
                id="name"
                className="form-control"
                value={props.formType === "edit" ? formData.name : undefined}
                onChange={handleChange}
              />
            </div>
            <div className="col-md-4">
              <label htmlFor="packSize">Pack Size: </label>
              <input
                type="text"
                id="packSize"
                className="form-control"
                value={
                  props.formType === "edit" ? formData.packSize : undefined
                }
                onChange={handleChange}
              />
            </div>
          </div>
          <div className="row">
            <div className="col-md-4">
              <label htmlFor="mrp">MRP: </label>
              <input
                type="text"
                id="mrp"
                className="form-control"
                value={props.formType === "edit" ? formData.mrp : undefined}
                onChange={handleChange}
              />
            </div>
            <div className="col-md-4">
              <label htmlFor="image">Image: </label>
              <input
                type="text"
                id="image"
                placeholder="Enter image link"
                className="form-control"
                value={props.formType === "edit" ? formData.image : undefined}
                onChange={handleChange}
              />
            </div>
            <div className="col-md-4">
              <label htmlFor="status">Status: </label>
              <select
                name="status"
                id="status"
                className="form-control"
                value={props.formType === "edit" ? formData.status : undefined}
                onChange={handleChange}
              >
                <option value="default" hidden></option>
                <option value="active">Active</option>
                <option value="inactive">Inactive</option>
              </select>
            </div>
          </div>
          <div className="row">
            <div className="col-md-12">
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
            </div>
          </div>
        </div>
      </form>
    </div>
  );
}

export default ProductForm;
