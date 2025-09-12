import React from "react";
import "./Toggle.css";

 const Toggle = ({ isOn, setisOn }) => {
  return (
    <div
      className={`toggle${isOn ? "on" : "off"}`}
      onClick={() => setisOn(!isOn)}  // toggle from parent
    >
      <div className="toggle-circle" >
    </div>
    </div>
  );
};
export default Toggle; 