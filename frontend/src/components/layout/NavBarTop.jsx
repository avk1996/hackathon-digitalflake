import React from "react";
import { useSelector } from "react-redux";

function NavBarTop() {
  const { currentUser } = useSelector((state) => state.user);
  console.log(currentUser);
  return (
    <div
      className="mb-3"
      style={{ backgroundColor: "#500582", width: "100vw", height: "30px" }}
    >
      <div>
        <a className="navbar-brand" href="#">
          <img
            src="https://digitalflake.com/wp-content/uploads/2023/04/DF_logo-transparent2.png"
            alt="Bootstrap"
            width="40"
          />
        </a>
      </div>
      <div>{currentUser}</div>
    </div>
  );
}

export default NavBarTop;
