import { useState } from 'react';
import styles from './Field.module.css'

function Field(props) {
  // state for field data
  const [data, setData] = useState([""]);

  // "+" button to add an additional field
  const addFieldHandler = (event) => {
    event.preventDefault();
    setData(prevData => {
      return [...prevData, ""]
    });
  }

  // update field data value
  const changeFieldDataHandler = (event, index) => {
    event.preventDefault();
    setData(prevData => {
      prevData[index] = event.target.value;
      return prevData;
    });
    let returnObject = {};
    returnObject[props.fieldName] = data;
    props.saveFieldDataHandler(returnObject);
  }

  const singularFieldName =  props.fieldName.charAt(0).toUpperCase() +
    props.fieldName.slice(1) + " ";
  const pluralFieldName =  props.fieldName.charAt(0).toUpperCase() +
    props.fieldName.slice(1) + "(s) ";

  return (
    <>
      <label>
        {/* Conditional rendering based on dynamic prop */}
        {props.dynamic ? pluralFieldName : singularFieldName}
        {props.dynamic ? <button className={styles.plusButton}
        onClick={addFieldHandler}>+</button> : ""}
      </label>
      {data.map((datum, index) => (
          <input type="text" onChange={e => changeFieldDataHandler(e, index)} required/>
      ))}
    </>
  )
}

export default Field;
