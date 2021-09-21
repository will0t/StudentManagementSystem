import React, { useState } from 'react';
import ReactDOM from 'react-dom';
import styles from './Form.module.css';
import Card from './UI/Card';
import Field from './Field';

function Form(props) {
  // state for form data
  const [formData, setFormData] = useState({});

  // prop for child to lift state up
  const saveFieldDataHandler = (data) => {
    event.preventDefault();
    setFormData(prevFormData => {
      let keys = Object.keys(data);
      for (let i = 0; i < keys.length; i++){
        let key = keys[i];
        prevFormData[key] = data[key];
      }
      return prevFormData;
    });
  }

  // on submit
  const submitHandler = (event) => {
    event.preventDefault();
    // lifting state up to parent
    props.formSubmitHandler(formData);
  }

  return (
    <Card>
      <form className={styles.form}>
        <div className={styles.formField}>
          {props.fields.map((field) => (
            <Field saveFieldDataHandler={saveFieldDataHandler}
              fieldName={field.fieldName} dynamic={field.dynamic}/>
          ))}
        </div>
        <div>
          <button onClick={submitHandler}>Submit</button>
        </div>
      </form>
    </Card>
  )
}

export default Form;
