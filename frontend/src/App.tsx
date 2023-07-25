import { useState } from "react";
import reactLogo from "./assets/react.svg";
import "bulma/css/bulma.css";
import Form from "./Form";
import TableComponent from "./TableComponent";

function App() {
  const [view, setView] = useState("form"); // form or table
  const [data, setData] = useState(null); // this will hold your form data

  return (
    <div>
      {view === "form" && <Form setView={setView} setData={setData} />}
      {view === "table" && <TableComponent data={data} />}{" "}
      {/* pass data to the Table component as a prop */}
    </div>
  );

  // const [count, setCount] = useState(0);

  // return (
  //   <div>
  //     <Form></Form>
  //   </div>
  // );
}

export default App;
