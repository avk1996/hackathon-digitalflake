import React from "react";

function Menu() {
  return (
    <div>
      <h1>Hello i am menu</h1>
      <div className="container-fluid">
        <div className="row flex-nowrap">
          {/* Sidebar */}
          <div className="shadow col-auto col-md-3 col-xl-2 px-sm-3 px-0 bg-warning bg-opacity-75 border border-start-0 rounded">
            <div className="d-flex flex-column align-items-sm-start px-10 pt-3 text-dark min-vh-100">
              {/* Sidebar Navigation */}

              <ul
                className="nav nav-pills flex-column mb-sm-auto mb-0 align-items-center align-items-sm-start"
                id="menu"
              >
                <li className="nav-item">
                  <button type="button" className="btn btn-outline-dark">
                    Home
                  </button>
                </li>
                <li className="nav-item">
                  <button type="button" className="btn btn-outline-dark">
                    Category
                  </button>
                </li>
                <li>
                  <button type="button" className="btn btn-outline-dark">
                    Products
                  </button>
                </li>
              </ul>

              {/* End Sidebar Navigation */}
            </div>
          </div>
          {/* End Sidebar */}
        </div>
      </div>
    </div>
  );
}

export default Menu;
