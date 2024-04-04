import axios from "axios";
import React, { useState } from "react";
import server from "../../server";

const MODEL_STYLES = {
  position: "fixed",
  top: "50%",
  left: "50%",
  transform: "translate(-50%,-50%)",
  backgroundColor: "#FFF",
  zIndex: 1000,
  padding: "10px",
  border: "2px solid black",
};

const OVERLAY = {
  position: "fixed",
  top: 0,
  left: 0,
  right: 0,
  bottom: 0,
  backgroundColor: "rgba(0,0,0,0.8)",
  zIndex: 1000,
};

function PopUp({ confirmDelete, setConfirmDelete, sendId }) {
  const disableStatus = () => {
    // console.log("clicked to disable status for id: " + sendId);
    axios
      .put(`${server}/update-category-status/${sendId}`)
      .then(() => {
        console.log("successfully disabled item");
        setConfirmDelete(false);
      })
      .catch((error) => {
        console.log("recived error: " + error);
      });
  };

  if (!confirmDelete) return null;
  return (
    <>
      <div style={OVERLAY}>
        <div
          className="position-fixed top-50 start-50 translate-middle bg-white border border-dark p-3 rounded"
          style={{ zIndex: 1000 }}
        >
          <div className="modal-header d-flex justify-content-center">
            <h5 className="modal-title">Delete</h5>
          </div>
          <div className="modal-body p-3">
            <p>Are you sure you want to delete?</p>
          </div>
          <div className="modal-footer d-flex justify-content-center">
            <button
              type="button"
              className="btn btn-outline-dark rounded-pill mx-3"
              data-bs-dismiss="modal"
              onClick={() => setConfirmDelete(false)}
            >
              Close
            </button>
            &nbsp;
            <button
              type="button"
              className="btn btn-outline-danger rounded-pill mx-3"
              onClick={disableStatus}
            >
              Delete
            </button>
          </div>
        </div>
      </div>
    </>
  );
}

export default PopUp;
