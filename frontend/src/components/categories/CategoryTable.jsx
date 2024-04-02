import React, { useEffect, useState } from "react";
import axios from "axios";
import server from "../../server";
import Button from "../button/Button";
import CreateCategory from "./CreateCategory";

function CategoryTable() {
  const [categoryData, setCategoryData] = useState([]);

  const [showCategoryForm, setshowCategoryForm] = useState(false);
  const [showProductTable, setShowProductTable] = useState(true);

  const editItem = () => {
    console.log("edit item clicked");
  };

  const addCategory = () => {
    setshowCategoryForm(true);
    setShowProductTable(false);
  };

  const deleteItem = (itemId) => {
    console.log("delete item clicked");
    const confirm = window.confirm("Are you sure you want to delete?");
    if (confirm) {
      axios
        .delete(`${server}/category/${itemId}`)
        .then((result) => {
          console.log(`deleted ${result.data}`);
          window.location.reload();
        })
        .catch((err) => {
          console.log(`Error deleting data`);
        });
    } else {
      console.log("data not deleted");
    }
  };

  useEffect(() => {
    const fetchData = async () => {
      await axios
        .get(`${server}/category`)
        .then((response) => {
          setCategoryData(response.data);
          console.log(response.data);
        })
        .catch((error) => {
          console.log("Error: " + error);
        });
    };
    fetchData();
  }, []);

  return (
    <>
      {showCategoryForm ? (
        <CreateCategory />
      ) : (
        <div>
          <div className="d-flex justify-content-end">
            <button className="btn btn-success" onClick={addCategory}>
              Add Category
            </button>
          </div>
          <table className="table">
            <thead>
              <tr>
                <th scope="col">ID</th>
                <th scope="col">Name</th>
                <th scope="col">Description</th>
                <th scope="col">Status</th>
                <th scope="col">Action</th>
              </tr>
            </thead>
            <tbody>
              {categoryData.map((category, index) => (
                <tr key={category._id}>
                  <td>{index + 110}</td>
                  <td>{category.name}</td>
                  <td>{category.description}</td>
                  <td>{category.status}</td>
                  <td>
                    <button className="btn btn-primary" onClick={editItem}>
                      Edit
                    </button>{" "}
                    &nbsp;
                    <button
                      className="btn btn-danger"
                      onClick={() => deleteItem(category._id)}
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </>
  );
}

export default CategoryTable;
