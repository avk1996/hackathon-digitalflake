import React, { useEffect, useState } from "react";
import axios from "axios";
import server from "../../server";
import { useNavigate } from "react-router-dom";
import PopUp from "../layout/PopUp";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEdit, faTrash } from "@fortawesome/free-solid-svg-icons";

function CategoryTable() {
  const [categoryData, setCategoryData] = useState([]);
  const [updateStatus, setUpdateStatus] = useState({
    status: "",
  });
  const [confirmDelete, setConfirmDelete] = useState(false);
  const [id, setId] = useState(null);

  const navigate = useNavigate();

  const deleteItem = (itemId) => {
    console.log("delete item clicked");
    setConfirmDelete(true);
    setId(itemId);
  };

  const editItem = (itemId) => {
    console.log(`edit item clicked ${itemId}`);
    navigate(`/edit-category/${itemId}`);
  };

  const addCategoryTest = () => {
    navigate(`/create-category`);
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
    <div
      className="d-flex flex-column p-3 m-3 shadow"
      style={{ width: "100vw", height: "100vh" }}
    >
      <div className="d-flex justify-content-end">
        <button className="btn btn-success" onClick={addCategoryTest}>
          Add Category
        </button>
      </div>
      <div>
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
                <td
                  style={{
                    color: category.status === "inactive" ? "red" : "inherit",
                  }}
                >
                  {category.status}
                </td>
                <td>
                  <button
                    className="btn btn-primary"
                    onClick={() => editItem(category._id)}
                  >
                    <FontAwesomeIcon icon={faEdit} />
                  </button>{" "}
                  &nbsp;
                  <button
                    className="btn btn-danger"
                    onClick={() => deleteItem(category._id)}
                    disabled={category.status === "inactive" ? true : false}
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
        tableType="category"
      />
    </div>
  );
}

export default CategoryTable;
