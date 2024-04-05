import axios from "axios";
import React, { useState } from "react";
import server from "../../server";
import { useNavigate } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEye, faEyeSlash } from "@fortawesome/free-solid-svg-icons";

function SignUp() {
  const [user, setUser] = useState({});
  const navigate = useNavigate();
  const [visible, setVisible] = useState(false);

  const handleChange = (e) => {
    const { id, value } = e.target;
    setUser((newData) => ({
      ...newData,
      [id]: value,
    }));
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    console.log(user);

    if (user.password !== user.renterPassword)
      window.alert("Password do not match");

    const config = { headers: { "Content-Type": "application/json" } };

    axios
      .post(`${server}/auth/signup`, user, config)
      .then((result) => {
        console.log(
          `Data added: ${result.headers} with status code ${result.status}`
        );
        navigate("/login");
      })
      .catch((err) => {
        console.log(`Error: ${err}`);
      });
  };

  const OVERLAY = {
    position: "fixed",
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundImage: `url("https://images.pexels.com/photos/3760093/pexels-photo-3760093.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2")`,
    zIndex: 1000,
    height: "100vh",
    backgroundSize: "cover",
    backgroundRepeat: "no-repeat",
  };
  return (
    <>
      <div className="d-flex flex-column" style={OVERLAY}>
        <div className="p-3 m-5 text-dark" style={{ width: "20rem" }}>
          <div className="d-flex flex-column justify-content-center">
            <div className="d-flex justify-content-center">
              <img
                src="https://digitalflake.com/wp-content/uploads/2023/04/DF_logo-transparent2.png"
                alt="digitalflake"
                width="100px"
              />
            </div>
            <div>
              <h3>Sign Up</h3>
            </div>
          </div>
          <form onSubmit={handleSubmit}>
            <div className="mb-3">
              <label htmlFor="name" className="form-label">
                Name:{" "}
              </label>
              <input
                className="form-control"
                type="text"
                id="name"
                onChange={handleChange}
                required={true}
              />
            </div>
            <div className="mb-3">
              <label htmlFor="email" className="form-label">
                Email:{" "}
              </label>
              <input
                className="form-control"
                type="email"
                id="email"
                onChange={handleChange}
                required={true}
              />
            </div>
            <div className="mb-3">
              <label htmlFor="password" className="form-label">
                Password:{" "}
              </label>
              &nbsp;&nbsp;
              {visible ? (
                <FontAwesomeIcon
                  icon={faEye}
                  onClick={() => {
                    setVisible(false);
                  }}
                />
              ) : (
                <FontAwesomeIcon
                  icon={faEyeSlash}
                  onClick={() => {
                    setVisible(true);
                  }}
                />
              )}
              <input
                className="form-control"
                type={visible ? "text" : "password"}
                id="password"
                onChange={handleChange}
                required={true}
              />
            </div>
            <div className="mb-3">
              <label htmlFor="re-pass" className="form-label">
                Re-enter Password:{" "}
              </label>
              &nbsp;&nbsp;
              {visible ? (
                <FontAwesomeIcon
                  icon={faEye}
                  onClick={() => {
                    setVisible(false);
                  }}
                />
              ) : (
                <FontAwesomeIcon
                  icon={faEyeSlash}
                  onClick={() => {
                    setVisible(true);
                  }}
                />
              )}
              <input
                className="form-control"
                type={visible ? "text" : "password"}
                id="renterPassword"
                onChange={handleChange}
                required={true}
              />
            </div>
            <div className="d-flex flex-row justify-content-between">
              <div className="d-flex justify-content-start">
                <button className="btn btn-dark">Register</button>
              </div>
              <div className="d-flex justify-content-end">
                <button
                  className="btn btn-outline-primary text-dark border-dark"
                  onClick={() => {
                    navigate("/");
                  }}
                >
                  Go to login
                </button>
              </div>
            </div>
          </form>
        </div>
      </div>
    </>
  );
}

export default SignUp;
