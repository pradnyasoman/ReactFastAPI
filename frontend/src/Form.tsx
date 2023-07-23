function Form() {
  return (
    <div className="container is-max-desktop ">
      <section className="section is-medium">
        <h1 className="title is-1 has-text-centered has-text-white ">
          ASA Change Info
        </h1>
      </section>

      <form>
        <div className="field">
          <label className="label is-large has-text-white">Entry ID</label>
          <div className="control">
            <input className="input is-large" type="text" name="name" />
          </div>
        </div>

        <div className="field">
          <label className="label is-large has-text-white">Assembly ID</label>
          <div className="control">
            <input className="input is-large" type="text" name="name" />
          </div>
        </div>

        <div className="field">
          <label className="label is-large has-text-white">Interface ID</label>
          <div className="control">
            <input className="input is-large" type="text" name="name" />
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
