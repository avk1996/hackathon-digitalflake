import React from "react";
import { Link } from "react-router-dom";

function Menu() {
  return (
    <nav>
      <div>
        {/* Sidebar */}
        <div>
          {/* Sidebar Navigation */}
          <ul>
            <li className="nav-item">
              <Link
                className="btn btn-outline-dark"
                aria-current="page"
                to="/home"
              >
                Home
              </Link>
            </li>
            <li className="nav-item">
              <Link
                className="btn btn-outline-dark"
                aria-current="page"
                to="/category-table"
              >
                Category
              </Link>
            </li>
            <li>
              <Link
                className="btn btn-outline-dark"
                aria-current="page"
                to="./product-table"
              >
                Products
              </Link>
            </li>
          </ul>

          {/* End Sidebar Navigation */}
        </div>
      </div>
    </nav>
  );
}

export default Menu;
