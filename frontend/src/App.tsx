import { useState } from "react";
import reactLogo from "./assets/react.svg";
import "bulma/css/bulma.css";
import Form from "./Form";

function App() {
  const [count, setCount] = useState(0);

  return (
    <div>
      <Form></Form>
    </div>
  );
}

export default App;
