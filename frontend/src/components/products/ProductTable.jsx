import React, { useEffect, useState } from "react";
import axios from "axios";
import server from "../../server";
import PopUp from "../layout/PopUp";
import { useNavigate } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEdit, faTrash } from "@fortawesome/free-solid-svg-icons";

function ProductTable() {
  const [productData, setProductData] = useState([]);

  const [confirmDelete, setConfirmDelete] = useState(false);
  const [id, setId] = useState(null);

  // edit and delete functions
  const editItem = (productId) => {
    console.log("edit item clicked " + productId);
    navigate(`/edit-product/${productId}`);
  };

  const deleteItem = (itemId) => {
    console.log("delete item clicked");
    setConfirmDelete(true);
    setId(itemId);
  };

  const navigate = useNavigate();
  // open form
  const addProduct = () => {
    navigate("/create-product");
  };

  // table data loading
  useEffect(() => {
    const fetchData = async () => {
      await axios
        .get(`${server}/products`)
        .then((response) => {
          setProductData(response.data);
          console.log(response.data);
        })
        .catch((error) => {
          console.log("Error: " + error);
        });
    };
    fetchData();
  }, []);

  return (
    <div
      className="d-flex flex-column p-3 m-3 shadow"
      style={{ width: "100vw", height: "100vh" }}
    >
      <div>
        <div className="d-flex justify-content-end">
          <button className="btn btn-success" onClick={addProduct}>
            Add Product
          </button>
        </div>
        {/* <Button onClick={addProduct} type="Product" /> */}
        <table className="table">
          <thead>
            <tr>
              <th scope="col">ID</th>
              <th scope="col">Name</th>
              <th scope="col">Pack Size</th>
              <th scope="col">Category</th>
              <th scope="col">MRP</th>
              <th scope="col">Image</th>
              <th scope="col">Status</th>
              <th scope="col">Action</th>
            </tr>
          </thead>
          <tbody>
            {productData.map((product, index) => (
              <tr key={product._id}>
                <td>{index + 110}</td>
                <td>{product.name}</td>
                <td>{product.packSize}</td>
                <td>{product.category}</td>
                <td>{product.mrp}</td>
                <td>
                  <img src={product.image} width="50px" />
                </td>
                <td
                  style={{
                    color: product.status === "inactive" ? "red" : "inherit",
                  }}
                >
                  {product.status}
                </td>
                <td>
                  <button
                    className="btn btn-primary"
                    onClick={() => editItem(product._id)}
                  >
                    <FontAwesomeIcon icon={faEdit} />
                  </button>{" "}
                  &nbsp;
                  <button
                    className="btn btn-danger"
                    onClick={() => deleteItem(product._id)}
                    disabled={product.status === "inactive" ? true : false}
                  >
                    <FontAwesomeIcon icon={faTrash} />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <PopUp
        confirmDelete={confirmDelete}
        setConfirmDelete={setConfirmDelete}
        sendId={id}
        tableType="product"
      />
    </div>
  );
}

export default ProductTable;
