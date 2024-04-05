import React, { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import server from "../../server";
import axios from "axios";

function Login() {
  const [userLogin, setUserLogin] = useState({
    email: "",
    password: "",
  });

  const handleChange = (e) => {
    const { id, value } = e.target;
    setUserLogin((loginData) => ({
      ...loginData,
      [id]: value,
    }));
  };

  const navigate = useNavigate();

  const login = (e) => {
    e.preventDefault();
    console.log(userLogin);
    const config = { headers: { "Content-Type": "application/json" } };

    axios
      .post(`${server}/auth/login`, userLogin, config)
      .then((result) => {
        console.log(
          `login success: ${result.data} with status code ${result.status}`
        );
        navigate("/home");
      })
      .catch((err) => {
        console.log(`Error : ${err}`);
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
    <div>
      <div style={OVERLAY}>
        <div
          className="m-5   p-3 rounded shadow bg-body-tertiary"
          style={{ width: "23rem" }}
        >
          <div className="d-flex justify-content-start">
            <Link
              type="button"
              className="btn btn-outline-primary"
              onClick={() => navigate("/create-account" )}
            >
              create account
            </Link>
          </div>
          <div className="d-flex flex-column justify-content-center">
            <div className="d-flex justify-content-center">
              <img
                src="https://digitalflake.com/wp-content/uploads/2023/04/DF_logo-transparent2.png"
                alt="digitalflake"
                width="200px"
              />
            </div>
            <div className="form-text fs-6 d-flex justify-content-center">
              Welcome to DigitalFlake Admin
            </div>
          </div>
          <div className="">
            <form onSubmit={login}>
              <div className="mb-3">
                <label htmlFor="exampleInputEmail1" className="form-label">
                  Email ID
                </label>
                <input
                  type="email"
                  className="form-control"
                  id="email"
                  aria-describedby="emailHelp"
                  onChange={handleChange}
                  required={true}
                />
              </div>
              <div className="mb-3">
                <label htmlFor="exampleInputPassword1" className="form-label">
                  Password
                </label>
                <input
                  type="password"
                  className="form-control"
                  id="password"
                  onChange={handleChange}
                  required={true}
                />
              </div>
              <div className="mb-3 d-flex justify-content-end">
                <Link>forget password</Link>
              </div>
              <div className="d-flex justify-content-center">
                <button type="submit" className="btn btn-primary">
                  Submit
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Login;
