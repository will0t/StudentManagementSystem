import Form from '../components/Form'
import List from '../components/List';
import React, { useState } from 'react';
import axios from "axios";

function Home() {
  // state for list
  const [listContent, setListContent] = useState([]);

  // fields array specify what fields a form has
  // dynamic attribute specifies if fields can be dynamically created
  const fields = [
    {fieldName: "tutor", dynamic: true}
  ];


  // on submit, retrieve form data and sends request to API
  const formSubmitHandler = (formData) => {
    event.preventDefault();
    const url = "http://localhost:8010/api/getcommonsstudents?";
    setListContent([]);

    let tutorEmails = formData.tutor;

    if (tutorEmails === undefined){
      alert("Tutor email cannot be empty.");
      return;
    }

    // forming GET request
    let query = url;
    for (let i = 0; i < tutorEmails.length; i++){
      if (tutorEmails[i] === "") break;
      if (i > 0) query += "&";
      query += "tutor=" + tutorEmails[i];
    }
    query = query.replaceAll('@', '%40');

    // sending GET request
    axios.get(query).then((response) => {
      setListContent(response.data.students);
    }).catch((error) =>
      alert(error.response.data.message)
    );
  }

  return (
    <>
      <div style={{borderBottom: "4px solid #1a487f", padding: "0 10px 10px 10px", marginBottom: "20px", fontSize: "1em"}}>
        Find Common Students
      </div>
      <Form fields={fields} formSubmitHandler={formSubmitHandler}/>
      <List listTitle="Common Students" listContent={listContent}/>
    </>
  )
}

export default Home;
