import Maps from "./Components/Maps";
import SearchBox from "./Components/SearchBox";
import React, { useState } from "react";

function App() {
  const [selectPosition, setSelectPosition] = useState(null)
  console.log("selectPosition", selectPosition)
  return (
    <div style={{
      display: "flex",
      flexDirection: "row",
      width: "100vw",
      height: "100vh",
    }}>
      <div style={{ width: "70vw", height: "100%" }}>
        <Maps selectPosition={selectPosition} />
      </div>
      <div style={{ width: "30vw", height: "100%" }}>
        <SearchBox selectPosition={selectPosition} setSelectPosition={setSelectPosition} />
      </div>
    </div>
  );
}

export default App;
