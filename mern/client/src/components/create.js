import React, { useState } from "react";
import { useNavigate } from "react-router";
 
export default function Create() {
 const [form, setForm] = useState({
   Service_Provider: "",
   Location: "",
   Contact_Information: "",
   Hours: "",
   Category: "",
 });
 const navigate = useNavigate();
 
 // These methods will update the state properties.
 function updateForm(value) {
   return setForm((prev) => {
     return { ...prev, ...value };
   });
 }
 
 // This function will handle the submission.
 async function onSubmit(e) {
   e.preventDefault();
 
   // When a post request is sent to the create url, we'll add a new record to the database.
   const newPerson = { ...form };
 
   await fetch("http://localhost:5000/record/add", {
     method: "POST",
     headers: {
       "Content-Type": "application/json",
     },
     body: JSON.stringify(newPerson),
   })
   .catch(error => {
     window.alert(error);
     return;
   });
 
   setForm({ Service_Provider: "",
     Location: "",
     Contact_Information: "",
     Hours: "",
     Category: "", });
   navigate("/");
 }
 
 // This following section will display the form that takes the input from the user.
 return (
   <div>
     <h3>Create New Record</h3>
     <form onSubmit={onSubmit}>
       <div className="form-group">
         <label htmlFor="Service_Provider">Service_Provider</label>
         <input
           type="text"
           className="form-control"
           id="name"
           value={form.Service_Provider}
           onChange={(e) => updateForm({ Service_Provider: e.target.value })}
         />
       </div>
       <div className="form-group">
         <label htmlFor="Location">Location</label>
         <input
           type="text"
           className="form-control"
           id="Location"
           value={form.Location}
           onChange={(e) => updateForm({ Location: e.target.value })}
         />
       </div>
       <div className="form-group">
         <label htmlFor="Contact_Information">Contact_Information</label>
         <input
             type="text"
             className="form-control"
             id="Contact_Information"
             value={form.Contact_Information}
             onChange={(e) => updateForm({ Contact_Information: e.target.value })}
         />
       </div>
       <div className="form-group">
         <label htmlFor="Hours">Hours</label>
         <input
             type="text"
             className="form-control"
             id="Hours"
             value={form.Hours}
             onChange={(e) => updateForm({ Hours: e.target.value })}
         />
       </div>
       <div className="form-group">
         <label htmlFor="Category">Category</label>
         <input
             type="text"
             className="form-control"
             id="Category"
             value={form.Category}
             onChange={(e) => updateForm({ Category: e.target.value })}
         />
       </div>


       <div className="form-group">
         <input
           type="submit"
           value="Add Resource"
           className="btn btn-primary"
         />
       </div>
     </form>
   </div>
 );
}