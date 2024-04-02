import React, { useEffect, useState } from "react";
import axios from "axios";
import server from "../../server";

function CategoryTable() {
  const [categoryData, setCategoryData] = useState([]);

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
    <div>
      <table className="table">
        <thead>
          <tr>
            <th scope="col">ID</th>
            <th scope="col">Name</th>
            <th scope="col">Description</th>
            <th scope="col">Status</th>
          </tr>
        </thead>
        <tbody>
          {categoryData.map((category, index) => (
            <tr key={category._id}>
              <td>{index + 110}</td>
              <td>{category.name}</td>
              <td>{category.description}</td>
              <td>{category.status}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default CategoryTable;
