import React, { useRef } from "react";
import axios from "axios";
import "./userForm.css";

function UserForm() {
  const nameRef = useRef();
  const emailRef = useRef();
  const phoneRef = useRef();

  const submitHandler = (e) => {
    e.preventDefault();
    let enteredName = nameRef.current.value;
    let enteredEmail = emailRef.current.value;
    let enteredPhone = phoneRef.current.value;

    if (enteredName.length === 0) {
      alert("Please Enter Name");
    } else if (
      enteredEmail.length === 0 ||
      enteredEmail.match(/"^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$"/)
    ) {
      alert("enter correct email");
    } else if (
      enteredPhone.length === 0 ||
      enteredPhone.match(
        /"^[\+]?[(]?[0-9]{3}[)]?[-\s\.]?[0-9]{3}[-\s\.]?[0-9]{4,6}$"/
      )
    ) {
      alert("Please enter correct Phonenumber");
    } else {
      const details = {
        enteredName,
        enteredEmail,
        enteredPhone,
      };
      axios
        .post("http://localhost:4000/user/contact", details)
        .then(() => {
          alert("data added to database SuccessFully");
        })
        .catch((error) => {
          console.log(error);
        });
    }
    nameRef.current.value = "";
    emailRef.current.value = "";
    phoneRef.current.value = "";
  };
  return (
    <div className="container">
      <h2>Contact Form</h2>

      <form action="submit" method="post">
        <input type="hidden" name="_csrf" value="{{csrf}}" />
        <label htmlFor="name">Name</label>
        <input type="text" name="name" id="name" ref={nameRef} required />
        <label htmlFor="email">Email:</label>
        <input type="email" name="email" id="email" ref={emailRef} required />
        <label htmlFor="phone">Phone:</label>
        <input type="number" name="phone" id="phone" ref={phoneRef} required />
        <button onClick={submitHandler} type="submit">
          Submit
        </button>
      </form>
    </div>
  );
}

export default UserForm;
