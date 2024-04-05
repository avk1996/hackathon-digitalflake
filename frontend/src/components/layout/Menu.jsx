import React from "react";
import { Link, NavLink } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faAngleRight } from "@fortawesome/free-solid-svg-icons";

function Menu() {
  return (
    <nav>
      <div className="shadow p-2">
        {/* Sidebar */}
        <div
          style={{ width: "200px", height: "100vh", backgroundColor: "white" }}
        >
          <div>
            <div className="nav-item mb-3">
              <NavLink
                className="btn btn-outline-dark d-flex justify-content-between align-items-center"
                aria-current="page"
                to="/home"
                style={{ width: "100%" }}
              >
                Home <FontAwesomeIcon icon={faAngleRight} />
              </NavLink>
            </div>
            <div className="nav-item mb-3">
              <Link
                className="btn btn-outline-dark d-flex justify-content-between align-items-center"
                aria-current="page"
                to="/category-table"
                style={{ width: "100%" }}
              >
                Category
                <FontAwesomeIcon icon={faAngleRight} />
              </Link>
            </div>
            <div>
              <Link
                className="btn btn-outline-dark d-flex justify-content-between align-items-center"
                aria-current="page"
                to="/product-table"
                style={{ width: "100%" }}
              >
                Products <FontAwesomeIcon icon={faAngleRight} />
              </Link>
            </div>
          </div>

          {/* End Sidebar Navigation */}
        </div>
      </div>
    </nav>
  );
}

export default Menu;
