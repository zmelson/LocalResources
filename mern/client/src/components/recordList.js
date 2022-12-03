import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";

const urlParams = new URLSearchParams(window.location.search);
function editLink(record) {
  if (urlParams.get('id')) {
    return `/edit/${record}`;
  }
  else return "/login";
}
const Record = (props) => (
 <tr>
   <td>{props.record.Service_Provider}</td>
   <td>{props.record.Location}</td>
   <td>{props.record.Contact_Information}</td>
   <td>{props.record.Hours}</td>
   <td>{props.record.Category}</td>
   <td>
     <Link className="btn btn-link" to={editLink(props.record._id)}>Edit</Link> |
     <button className="btn btn-link"
       onClick={() => {
        if (urlParams.get('id')) {
          props.deleteRecord(props.record._id);
        }
        else window.alert("Please login to delete resource!");
       }}
     >
       Delete
     </button>
   </td>
 </tr>
);
 
export default function RecordList() {
 const [records, setRecords] = useState([]);
 const [form, setForm] = useState({
  filter: "",
});

 // This method fetches the records from the database.
 useEffect(() => {
   async function getRecords() {
     const response = await fetch(`http://localhost:5000/record/`);
 
     if (!response.ok) {
       const message = `An error occurred: ${response.statusText}`;
       window.alert(message);
       return;
     }
 
     var records = await response.json();
     setRecords(records);
     //delete unwanted lines
     records = records.filter((row) => row.Category.includes(form.filter));
     setRecords(records);
   }
 
   getRecords();
 
   return;
 }, [records.length, form.filter]);
 
 // This method will delete a record
 async function deleteRecord(id) {
   await fetch(`http://localhost:5000/${id}`, {
     method: "DELETE"
   });
 
   const newRecords = records.filter((el) => el._id !== id);
   setRecords(newRecords);
 }
 
 function recordList() {
  return records.map((record) => {
    return (
      <Record
        record={record}
        deleteRecord={() => deleteRecord(record._id)}
        key={record._id}
      />
    );
  });
}

 async function onSubmit(e) {
  e.preventDefault();
  const givenFilter = {
    filter: form.filter
  };
}
  function updateForm(value) {
    return setForm((prev) => {
      return { ...prev, ...value };
    });
  }
 
 // This following section will display the table with the records of individuals.
 return (
   <div>
     <h3>Record List</h3>
     <h6>Category Filter</h6>
      <form onSubmit={onSubmit}>
      <div className="form-group">
        <div className="form-check form-check-inline">
          <input
            className="form-check-input"
            type="radio"
            name="positionOptions"
            id="catClothing"
            value="Clothing"
            checked={form.filter === "Clothing"}
            onChange={(e) => updateForm({ filter: e.target.value })}
          />
          <label htmlFor="positionJunior" className="form-check-label">Clothing</label>
        </div>
        <div className="form-check form-check-inline">
          <input
            className="form-check-input"
            type="radio"
            name="positionOptions"
            id="catCrisisCoounseling"
            value="Crisis Counseling"
            checked={form.filter === "Crisis Counseling"}
            onChange={(e) => updateForm({ filter: e.target.value })}
          />
          <label htmlFor="positionSenior" className="form-check-label">Crisis Counseling</label>
        </div>
        <div className="form-check form-check-inline">
          <input
            className="form-check-input"
            type="radio"
            name="positionOptions"
            id="catDental"
            value="Dental"
            checked={form.filter === "Dental"}
            onChange={(e) => updateForm({ filter: e.target.value })}
          />
          <label htmlFor="positionJunior" className="form-check-label">Dental</label>
        </div>
        <div className="form-check form-check-inline">
          <input
            className="form-check-input"
            type="radio"
            name="positionOptions"
            id="catFoodAssistance"
            value="Food Assistance"
            checked={form.filter === "Food Assistance"}
            onChange={(e) => updateForm({ filter: e.target.value })}
          />
          <label htmlFor="positionJunior" className="form-check-label">Food Assistance</label>
        </div>
        <div className="form-check form-check-inline">
          <input
            className="form-check-input"
            type="radio"
            name="positionOptions"
            id="catMedical-Clinic"
            value="Medical-Clinic"
            checked={form.filter === "Medical-Clinic"}
            onChange={(e) => updateForm({ filter: e.target.value })}
          />
          <label htmlFor="positionJunior" className="form-check-label">Medical-Clinic</label>
        </div>
        <div className="form-check form-check-inline">
          <input
            className="form-check-input"
            type="radio"
            name="positionOptions"
            id="catMentalHealth"
            value="Mental Health"
            checked={form.filter === "Mental Health"}
            onChange={(e) => updateForm({ filter: e.target.value })}
          />
          <label htmlFor="positionJunior" className="form-check-label">Mental Health</label>
        </div>
        <div className="form-check form-check-inline">
          <input
            className="form-check-input"
            type="radio"
            name="positionOptions"
            id="catShelters"
            value="Shelters"
            checked={form.filter === "Shelters"}
            onChange={(e) => updateForm({ filter: e.target.value })}
          />
          <label htmlFor="positionJunior" className="form-check-label">Shelters</label>
        </div>
        <div className="form-check form-check-inline">
          <input
            className="form-check-input"
            type="radio"
            name="positionOptions"
            id="catSupportGroups"
            value="Support Groups"
            checked={form.filter === "Support Groups"}
            onChange={(e) => updateForm({ filter: e.target.value })}
          />
          <label htmlFor="positionJunior" className="form-check-label">Support Groups</label>
        </div>
        <div className="form-check form-check-inline">
          <input
            className="form-check-input"
            type="radio"
            name="positionOptions"
            id="catTrransportation"
            value="Transportation"
            checked={form.filter === "Transportation"}
            onChange={(e) => updateForm({ filter: e.target.value })}
          />
          <label htmlFor="positionJunior" className="form-check-label">Transportation</label>
        </div>
        <div className="form-check form-check-inline">
          <input
            className="form-check-input"
            type="radio"
            name="positionOptions"
            id="catVisionCare"
            value="Vision Care"
            checked={form.filter === "Vision Care"}
            onChange={(e) => updateForm({ filter: e.target.value })}
          />
          <label htmlFor="positionJunior" className="form-check-label">Vision Care</label>
        </div>
        </div>
        <div className="form-group">
            <input
                type="submit"
                value="Clear"
                className="btn btn-primary"
                onClick={(e) => updateForm({filter: "" })}
            />
          </div>
      </form>
     <table className="table table-striped" style={{ marginTop: 20 }}>
       <thead>
         <tr>
           <th style={{width: window.innerWidth/6}}>Service Provider</th>
           <th style={{width: window.innerWidth/6}}>Location</th>
           <th style={{width: window.innerWidth/6}}>Contact Information</th>
           <th style={{width: window.innerWidth/6}}>Hours</th>
           <th style={{width: window.innerWidth/6}}>Category</th>
           <th style={{width: window.innerWidth/6}}>Action</th>
         </tr>
       </thead>
       <tbody>{recordList()}</tbody>
     </table>
   </div>
 );
}