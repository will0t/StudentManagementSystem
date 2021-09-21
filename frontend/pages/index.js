import Form from '../components/Form'
import List from '../components/List';
import axios from "axios";
import React, { useState } from 'react';

function Home() {
  // state for list
  const [listContent, setListContent] = useState([]);

  // fields array specify what fields a form has
  // dynamic attribute specifies if fields can be dynamically created
  const fields = [
    {fieldName: "tutor", dynamic: true}
  ];

  const url = "http://localhost:8010/api/getcommonsstudents?";

  // on submit, retrieve form data and sends request to API
  const formSubmitHandler = (formData) => {
    event.preventDefault();
    setListContent([]);

    let tutorEmails = formData.tutor;
    console.log(tutorEmails);

    if (tutorEmails === undefined){
      alert("Tutor email cannot be empty.");
      return;
    }

    let query = url;
    for (let i = 0; i < tutorEmails.length; i++){
      if (tutorEmails[i] === "") break;
      if (i > 0) query += "&";
      query += "tutor=" + tutorEmails[i];
    }
    query = query.replaceAll('@', '%40');

    axios.get(query).then((response) => {
      setListContent(response.data.students);
    }).catch((error) =>
      alert(error.response.data.message)
    );
  }

  return (
    <>
      <Form fields={fields} formSubmitHandler={formSubmitHandler}/>
      <List listTitle="Common Students" listContent={listContent}/>
    </>
  )
}

export default Home;
