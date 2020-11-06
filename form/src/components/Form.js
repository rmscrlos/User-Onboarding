import React, {useState, useEffect} from 'react'
import * as yup from 'yup';
import axios from 'axios';
import Container from './Container'

//Schema
const formSchema = yup.object().shape({
  name: yup.string().required("You must enter a name"),
  email: yup.string().email("Must include a validate email").required("Must enter an email"),
  password: yup.string()
  .required('No password provided.') 
  .min(8, 'Password is too short - should be 8 chars minimum.')
  .matches(/[a-zA-Z]/, 'Password can only contain Latin letters.'),
  terms: yup.boolean().oneOf([true], "Must agree with T&C"),
})

function Form() {

  //posts
  const [post, setPost] = useState([])

  //Stores state of form
  const [formState, setFormState] = useState({
    name: "",
    email: "",
    password: "",
    terms: ""
  })

  //disable button
  const [buttonDisabled, setButtonDisabled] = useState(true);

  //errors state
  const [errors, setErrors] = useState({
    name: "",
    email: "",
    password: "",
    terms: ""
  })

  //Validate change 
  const validate = (e) => {
    let value =
    e.target.type === "checkbox" ? e.target.checked : e.target.value;
    yup
      .reach(formSchema, e.target.name)
      .validate(value)
      .then(valid => {
        setErrors({...errors, [e.target.name]: ""})
      })
      .catch(err => {
        setErrors({...errors, [e.target.name]: err.errors[0]})
      })
  }

  //onChange function
  const handleChanges = (e) => {
    e.persist();
    validate(e);
    setFormState({...formState, [e.target.name]: e.target.type === "checkbox" ? e.target.checked : e.target.value})
  }

  //onSubmit functions 
  const formSubmit = (e) => {
    e.preventDefault()
    axios.post("https://reqres.in/api/users", formState)
      .then(res => {
        setPost(res.data)
        setFormState({
          name: "",
          email: "",
          password: "",
          terms: "",
      })
    })
    .catch((err) => {
      console.log(err.res)
    })
  }

  useEffect(() => {
    formSchema.isValid(formState).then((valid) => {
      setButtonDisabled(!valid);
    });
  }, [formState]);

  console.log(post)

  return (
    <div>
      <form onSubmit={formSubmit}>
        <label htmlFor="name">Name</label>
        <input id="name" type="text" name="name" value={formState.name} onChange={handleChanges}/>
          {errors.name.length > 0 ? <p className="error">{errors.name}</p> : null}
        <label htmlFor="email">Email</label>
        <input id="email" type="email" name="email" value={formState.email} onChange={handleChanges}/>
        {errors.email.length > 0 ? <p className="error">{errors.email}</p> : null}
        <label htmlFor="password">Password</label>
        <input id="password" type="password" name="password" value={formState.password} onChange={handleChanges}/>
        {errors.password.length > 0 ? <p className="error">{errors.password}</p> : null}
        <label htmlFor="terms" className="terms">
        <input id="terms" type="checkbox" name="terms" checked={formState.terms} onChange={handleChanges}/>
        Terms & Conditions
        </label>
        {errors.terms.length > 0 ? <p className="error">{errors.terms}</p> : null}
        <button type="submit">Submit</button>
      </form>

      <Container posts={post}/>
    </div>
  )
}

export default Form
