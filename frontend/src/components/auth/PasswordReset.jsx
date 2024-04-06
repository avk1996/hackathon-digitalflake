import axios from "axios";
import React, { useState } from "react";
import server from "../../server";
import { useDispatch } from "react-redux";
import { signOutSuccess } from "../../redux/user/UserSlice";
import { useNavigate, Link } from "react-router-dom";
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
  borderRadius: "10px",
  padding: "20px",
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
  const disableStatus = () => {};

  const navigate = useNavigate();
  if (!confirmDelete) return null;
  return (
    <>
      <div style={OVERLAY}>
        <div className="bg-light" style={MODEL_STYLES}>
          <form>
            <div
              className="d-flex justify-content-center mb-3"
              style={{ fontFamily: "sans-serif", color: "#500582" }}
            >
              Did you forget your password ?
            </div>
            <div className="fw-ligher d-flex justify-content-center form-text mb-3">
              Enter your email address and we'll send you a link to restore
              password
            </div>
            <div className="p-3">
              <div className="mb-3">
                <label
                  for="exampleInputEmail1"
                  className="fw-bold d-flex justify-content-center"
                >
                  Email address
                </label>
                <input
                  type="email"
                  className="form-control border border-dark"
                  id="exampleInputEmail1"
                  aria-describedby="emailHelp"
                />
              </div>

              <div className="d-flex justify-content-center">
                <button
                  type="submit"
                  className="btn btn-primary"
                  style={{ width: "100%" }}
                >
                  Submit
                </button>
              </div>
              <Link
                className="fw-ligher d-flex justify-content-center form-text mb-3"
                onClick={() => setConfirmDelete(false)}
              >
                Back to Log In
              </Link>
            </div>
          </form>
        </div>
      </div>
    </>
  );
}

export default PopUp;
