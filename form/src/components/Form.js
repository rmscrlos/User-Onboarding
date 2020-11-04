import React, {useState} from 'react'

function Form() {
  const [formState, setFormState] = useState({
    name: "",
    email: "",
    password: "",
    terms: "",
  })


  return (
    <div>
      <form>
        <label htmlFor="name">Name</label>
        <input id="name" type="text" name="name"/>
        <label htmlFor="email">Email</label>
        <input id="email" type="email" name="email"/>
        <label htmlFor="password">Password</label>
        <input id="password" type="password" name="password"/>
        <label htmlFor="terms" className="terms">
        <input id="terms" type="checkbox" name="terms"/>
        Terms & Conditions
        </label>
        <button type="submit">Submit</button>
      </form>
    </div>
  )
}

export default Form
