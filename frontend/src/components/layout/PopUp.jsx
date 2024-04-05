import axios from "axios";
import React, { useState } from "react";
import server from "../../server";
import { useDispatch } from "react-redux";
import { signOutSuccess } from "../../redux/user/UserSlice";
import { useNavigate } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowLeft } from "@fortawesome/free-solid-svg-icons";

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

function PopUp({ confirmDelete, setConfirmDelete, sendId, tableType }) {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const disableStatus = () => {
    // console.log("clicked to disable status for id: " + sendId);
    if (tableType === "category") {
      axios
        .put(`${server}/update-category-status/${sendId}`)
        .then(() => {
          console.log("successfully disabled item");
          setConfirmDelete(false);
          window.location.reload();
        })
        .catch((error) => {
          console.log("recived error: " + error);
        });
    } else if (tableType === "product") {
      axios
        .put(`${server}/update-product-status/${sendId}`)
        .then(() => {
          console.log("successfully disabled item");
          setConfirmDelete(false);
          window.location.reload();
        })
        .catch((error) => {
          console.log("recived error: " + error);
        });
    } else if (tableType === "logout") {
      navigate("/");
      window.location.reload(true);
      dispatch(signOutSuccess());
    }
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
            <h5 className="modal-title">
              {tableType === "logout" ? "Logout" : "Delete"}
            </h5>
          </div>
          <div className="modal-body p-3">
            <p>
              Are you sure you want to{" "}
              {tableType === "logout" ? "Logout" : "Delete"}?
            </p>
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
              {tableType === "logout" ? "Logout" : "Delete"}
            </button>
          </div>
        </div>
      </div>
    </>
  );
}

export default PopUp;
