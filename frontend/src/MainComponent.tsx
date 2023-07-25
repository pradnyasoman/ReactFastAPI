import React, { useState } from "react";
import Form from "./FormComponent";
import TableComponent from "./TableComponent";
import AllChartsComponent from "./AllcChartsComponent";
import { AppContext, ContextProps } from "./AppContext";

/**
 * Main component to hold subcomponents of Form, Table and Graphs.
 * @component
 */
function MainComponent() {
  const [view, setView] = useState("form");
  const [data, setData] = useState<any | null>(null);

  const contextValue: ContextProps = {
    currentPage: view,
    setCurrentPage: setView,
    data,
    setData,
  };

  return (
    <AppContext.Provider value={contextValue}>
      {view === "form" && <Form />}
      {view === "table" && data && <TableComponent data={data} />}
      {view === "graphs" && data && <AllChartsComponent data={data} />}
    </AppContext.Provider>
  );
}

export default MainComponent;
