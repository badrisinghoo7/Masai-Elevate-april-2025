import { useState } from "react";
import reactLogo from "./assets/react.svg";
import viteLogo from "/vite.svg";
import "./App.css";
import ServerChecker from "./components/ServerChecker";

function App() {
  const [count, setCount] = useState(0);

  return (
    <>
      <ServerChecker />
    </>
  );
}

export default App;
