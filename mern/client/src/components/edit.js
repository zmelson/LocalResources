import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router";

export default function Edit() {
  const [form, setForm] = useState({
    Service_Provider: "",
    Location: "",
    Contact_Information: "",
    Hours: "",
    Category: "",
  });
  const params = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    async function fetchData() {
      const id = params.id.toString();
      const response = await fetch(`http://localhost:5000/record/${params.id.toString()}`);

      if (!response.ok) {
        const message = `An error has occurred: ${response.statusText}`;
        window.alert(message);
        return;
      }

      const record = await response.json();
      if (!record) {
        window.alert(`Record with id ${id} not found`);
        navigate("/");
        return;
      }

      setForm(record);
    }

    fetchData();

    return;
  }, [params.id, navigate]);

  // These methods will update the state properties.
  function updateForm(value) {
    return setForm((prev) => {
      return { ...prev, ...value };
    });
  }

  async function onSubmit(e) {
    e.preventDefault();
    const editedResource = {
      Service_Provider: form.Service_Provider,
      Location: form.Location,
      Contact_Information: form.Contact_Information,
      Hours: form.Hours,
      Category: form.Category,
    };

    // This will send a post request to update the data in the database.
    await fetch(`http://localhost:5000/update/${params.id}`, {
      method: "POST",
      body: JSON.stringify(editedResource),
      headers: {
        'Content-Type': 'application/json'
      },
    });

    navigate("/");
  }

  // This following section will display the form that takes input from the user to update the data.
  return (
      <div>
        <h3>Update Resource</h3>
        <form onSubmit={onSubmit}>
          <div className="form-group">
            <label htmlFor="Service Provider">Service Provider: </label>
            <input
                type="text"
                className="form-control"
                id="Service Provider"
                value={form.Service_Provider}
                onChange={(e) => updateForm({ Service_Provider: e.target.value })}
            />
          </div>
          <div className="form-group">
            <label htmlFor="Location">Location: </label>
            <input
                type="text"
                className="form-control"
                id="Location"
                value={form.Location}
                onChange={(e) => updateForm({ Location: e.target.value })}
            />
          </div>
          <div className="form-group">
            <label htmlFor="Contact Information">Contact Information: </label>
            <input
                type="text"
                className="form-control"
                id="Contact_Information"
                value={form.Contact_Information}
                onChange={(e) => updateForm({ Contact_Information: e.target.value })}
            />
          </div>
          <div className="form-group">
            <label htmlFor="hours">Hours: </label>
            <input
                type="text"
                className="form-control"
                id="hours"
                value={form.Hours}
                onChange={(e) => updateForm({ Hours: e.target.value })}
            />
          </div>
          <div className="form-group">
            <label htmlFor="Category">Category: </label>
            <input
                type="text"
                className="form-control"
                id="Category"
                value={form.Category}
                onChange={(e) => updateForm({ Category: e.target.value })}
            />
          </div>
          <br />

          <div className="form-group">
            <input
                type="submit"
                value="Update Resource"
                className="btn btn-primary"
            />
          </div>
        </form>
      </div>
  );
}
