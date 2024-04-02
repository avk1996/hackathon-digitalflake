import React from "react";

function Button(props) {
  return (
    <div className="d-flex justify-content-end">
      <button className="btn btn-success">Add {props.type}</button>
    </div>
  );
}

export default Button;
