import Form from '../components/Form';


function Register() {
  const fields = [
    {fieldName: "tutor", dynamic: false},
    {fieldName: "student", dynamic: true}
  ];

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
      <div style={{borderBottom: "4px solid #1a487f", padding: "0 10px 10px 10px", marginBottom: "20px", fontSize: "1em"}}>
        Register Students
      </div>
      <Form fields={fields} formSubmitHandler={formSubmitHandler}/>
    </>
  )
}

export default Register;
