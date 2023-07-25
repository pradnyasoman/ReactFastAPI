import React, { FormEvent, useState, useContext } from "react";
import { AppContext } from "./AppContext";

/**
 * Form component to take input parameters and send POST request.
 * @component
 */
function Form() {
  const [entryId, setEntryId] = useState("");
  const [assemblyId, setAssemblyId] = useState("");
  const [interfaceId, setInterfaceId] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const context = useContext(AppContext);

  if (!context) {
    throw new Error("AppContext not available");
  }

  const { setCurrentPage, setData } = context;
  const handleSubmit = async (event: FormEvent) => {
    event.preventDefault();

    const data = {
      entry_id: entryId,
      assembly_id: assemblyId,
      interface_id: interfaceId,
    };

    try {
      const response = await fetch("http://localhost:8000/asa-change", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      });

      if (!response.ok) {
        throw new Error("Failed to fetch data");
      }
      const responseData = await response.json();

      setData(responseData);
      setCurrentPage("table");
    } catch (error) {
      setErrorMessage(
        "Improper input. Please correct your input values and try again."
      );
      console.error(error);
    }
  };

  return (
    <div className="container is-max-desktop ">
      <section className="section is-medium">
        <h1 className="title is-1 has-text-centered has-text-white ">
          Enter Protein Information to check ASA change
        </h1>
      </section>

      <form onSubmit={handleSubmit}>
        <div className="field">
          <label className="label is-large has-text-white">Entry ID</label>
          <div className="control">
            <input
              value={entryId}
              onChange={(e) => setEntryId(e.target.value)}
              className="input is-large"
              type="text"
              name="name"
              placeholder="example: 1RH7"
            />
          </div>
        </div>

        <div className="field">
          <label className="label is-large has-text-white">Assembly ID</label>
          <div className="control">
            <input
              value={assemblyId}
              onChange={(e) => setAssemblyId(e.target.value)}
              className="input is-large"
              type="text"
              name="name"
              placeholder="example: 1"
            />
          </div>
        </div>

        <div className="field">
          <label className="label is-large has-text-white">Interface ID</label>
          <div className="control">
            <input
              value={interfaceId}
              onChange={(e) => setInterfaceId(e.target.value)}
              className="input is-large"
              type="text"
              name="name"
              placeholder="example: 3"
            />
          </div>
        </div>

        {errorMessage && (
          <div className="notification is-danger has-text-centered">
            {errorMessage}
          </div>
        )}
        <div className="field has-text-centered">
          <div className="control">
            <button className="button is-link is-large is-danger">
              Submit
            </button>
          </div>
        </div>
      </form>
    </div>
  );
}

export default Form;
