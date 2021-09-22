import Form from '../components/Form'
import List from '../components/List';
import React, { useState } from 'react';

function Notification() {
  // state for list
  const [listContent, setListContent] = useState([]);

  const fields = [
    {fieldName: "tutor", dynamic: false},
    {fieldName: "notification", dynamic: false}
  ];

  const formSubmitHandler = (formData) => {
    event.preventDefault();
    // submit post request here
  }

  return (
    <>
      <div style={{borderBottom: "4px solid #1a487f", padding: "0 10px 10px 10px", marginBottom: "20px", fontSize: "1em"}}>
        Receive Notification Recipients
      </div>
      <Form fields={fields} formSubmitHandler={formSubmitHandler}/>
      <List listTitle="Recipients" listContent={listContent}/>
    </>
  )
}

export default Notification;
