import React, { FormEvent, useState } from "react";

function Form() {
  const [entryId, setEntryId] = useState("");
  const [assemblyId, setAssemblyId] = useState("");
  const [interfaceId, setInterfaceId] = useState("");

  const handleSubmit = async (event: FormEvent) => {
    event.preventDefault(); // Prevents page refresh

    const data = {
      entry_id: entryId,
      assembly_id: assemblyId,
      interface_id: interfaceId,
    };
    console.log(data);
    const response = await fetch("http://localhost:8000/asa-change", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    });

    const responseData = await response.json();
    console.log(responseData);
  };

  return (
    <div className="container is-max-desktop ">
      <section className="section is-medium">
        <h1 className="title is-1 has-text-centered has-text-white ">
          ASA Change Info
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
            />
          </div>
        </div>

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
