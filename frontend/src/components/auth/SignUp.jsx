import axios from "axios";
import React, { useState } from "react";
import server from "../../server";

function SignUp() {
  const [user, setUser] = useState({});

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
      })
      .catch((err) => {
        console.log(`Error: ${err}`);
      });
  };

  return (
    <>
      <div className="d-flex flex-column">
        <div
          className="p-3 mb-2 bg-primary text-white"
          style={{ width: "18rem" }}
        >
          <div className="d-flex justify-content-center">
            <h1>Sign Up</h1>
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
              <input
                className="form-control"
                type="password"
                id="password"
                onChange={handleChange}
                required={true}
              />
            </div>
            <div className="mb-3">
              <label htmlFor="re-pass" className="form-label">
                Re-enter Password:{" "}
              </label>
              <input
                className="form-control"
                type="password"
                id="renterPassword"
                onChange={handleChange}
                required={true}
              />
            </div>
            <div className="d-flex justify-content-center">
              <button className="btn btn-dark">Register</button>
            </div>
          </form>
        </div>
      </div>
    </>
  );
}

export default SignUp;
