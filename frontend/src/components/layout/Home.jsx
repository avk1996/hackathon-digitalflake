import React from "react";
import PopUp from "./PopUp";
import { useState } from "react";

function Home() {
  const [confirmDelete, setConfirmDelete] = useState(false);

  const logout = () => {
    console.log("delete item clicked");
    setConfirmDelete(true);
  };

  return (
    <div
      className="d-flex flex-column p-3 m-3 shadow"
      style={{ width: "100vw", height: "100vh" }}
    >
      <div className="d-flex justify-content-end">
        <button className="btn btn-outline-danger" onClick={logout}>
          Logout
        </button>
      </div>
      <div className="d-flex justify-content-center">
        <img
          src="https://digitalflake.com/wp-content/uploads/2023/04/DF_logo-transparent2.png"
          alt="Bootstrap"
          width="300px"
        />
      </div>
      <div className="d-flex justify-content-center">
        <h3>Welcome to DigitalFlake Admin</h3>
      </div>
      <PopUp
        confirmDelete={confirmDelete}
        setConfirmDelete={setConfirmDelete}
        tableType="logout"
      />
    </div>
  );
}

export default Home;
