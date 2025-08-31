import { useState } from "react";

const Toggle = ()=> {
  const [isOn, setIsOn] = useState(false);

  const toggleState=()=>{
    setIsOn(!isOn);
  }

  return (
    <div>
      <p>Status: {isOn ? "ON" : "OFF"}</p>
      <button className="border 2 bg-amber-200 p-3 rounded-xl" onClick={(toggleState) => setIsOn(!isOn)}>Toggle</button>
    </div>
  );
}

export default Toggle;
