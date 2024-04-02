import React, { useEffect, useState } from "react";
import axios from "axios";
import server from "../../server";

function ProductTable() {
  const [productData, setProductData] = useState([]);

  // edit and delete functions
  const editItem = () => {
    console.log("edit item clicked");
  };
  const deleteItem = () => {
    
    console.log("delete item clicked");
  };

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
    <div>
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
              <td>{product.image}</td>
              <td>{product.status}</td>
              <td>
                <button className="btn btn-primary" onClick={editItem}>
                  Edit
                </button>{" "}
                &nbsp;
                <button className="btn btn-danger" onClick={deleteItem}>
                  Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default ProductTable;
