import axios from "axios";
import React, { useState } from "react";
import server from "../../server";
import { useDispatch } from "react-redux";
import { signOutSuccess } from "../../redux/user/UserSlice";
import { useNavigate, Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowLeft } from "@fortawesome/free-solid-svg-icons";
import toast from "react-hot-toast";

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
  const [data, setData] = useState({
    email: "",
  });
  const disableStatus = () => {};

  const handleSubmit = (e) => {
    e.preventDefault();
    const config = { headers: { "Content-Type": "application/json" } };
    // toast.success(data);
    // setEmail(JSON.parse(email));
    axios
      .post(`${server}/auth/forgetpassword`, data, config)
      .then((result) => {
        toast.success("Please check your mail");
      })
      .catch((err) => {
        toast.error("Error sending email: " + err);
      });
  };

  const navigate = useNavigate();
  if (!confirmDelete) return null;
  return (
    <>
      <div style={OVERLAY}>
        <div className="bg-light" style={MODEL_STYLES}>
          <form onSubmit={handleSubmit}>
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
                  htmlFor="email"
                  className="fw-bold d-flex justify-content-center"
                >
                  Email address
                </label>
                <input
                  type="email"
                  className="form-control border border-dark"
                  id="email"
                  name="email"
                  value={data.email}
                  onChange={(e) => {
                    setData({ ...data, email: e.target.value });
                  }}
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
            </div>
          </form>
          <Link
            className="fw-ligher d-flex justify-content-center form-text mb-3"
            onClick={() => setConfirmDelete(false)}
          >
            Back to Log In
          </Link>
        </div>
      </div>
    </>
  );
}

export default PopUp;
