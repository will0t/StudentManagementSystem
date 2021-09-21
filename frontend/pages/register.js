import Form from '../components/Form';
import axios from "axios";


function Register() {
  const fields = [
    {fieldName: "tutor", dynamic: false},
    {fieldName: "student", dynamic: true}
  ];

  const url = "http://localhost:8010/api/register";

  // on submit, retrieve form data and sends request to API
  const formSubmitHandler = (formData) => {
    event.preventDefault();

    let tutorEmail = formData.tutor;
    console.log(tutorEmail);
    let studentEmails = formData.student;
    console.log(studentEmails);

    if (studentEmails === undefined){
      alert("Student email cannot be empty.");
      return;
    }
  }

  return (
    <>
      <Form fields={fields} formSubmitHandler={formSubmitHandler}/>
    </>
  )
}

export default Register;
