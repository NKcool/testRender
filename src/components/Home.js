import axios from 'axios';
import React, { useState, useContext } from 'react'
import { Link, useNavigate } from 'react-router-dom';
import userContext from '../context/user/usercontext';
import Form from 'react-bootstrap/Form';

export default function Home() {
  const navigate = useNavigate();
  const { updateUser } = useContext(userContext);
  const [userName, setUserName] = useState();
  const [password, setPassword] = useState();
  const [message, setMessage] = useState("")
  const [language, setlanguage] = useState("english")

  const login = async () => {
    try {
      axios.post(process.env.REACT_APP_baseUrl + "users", {
        name: userName,
        password: password,
        language: language
      })
        .then((response) => {
          if (response.data.user) {
            response.data.user.password = "";
            
            updateUser(response.data.user)
            const userData = {
              user: response.data.user,
            };
            localStorage.setItem('userData', JSON.stringify(userData));
            navigate('/profile')
          } else {
            setMessage(response.data)
          }
        });
    } catch (e) {
      console.log(e);
    }

  }



  const submitHandler = (e) => {
    e.preventDefault();
    login()
    console.log(language);

  }

  const userHandler = (e) => {
    setUserName(e.target.value)

  }
  const passHandler = (e) => {
    setPassword(e.target.value)

  }
  const languageHandler = (e) => {
    setlanguage(e.target.value)
  }

  
  return (
    <div className='home'>
      <form name='form' className='signUpForm'>
        <h3>Register
        </h3>
        <div className="mb-3">
          <label>User name</label>
          <input
            type="text"
            className="form-control"
            placeholder="First name"
            required
            onChange={userHandler}
          />
        </div>

        <div className="mb-3">
          <label>language</label>
          <Form.Select aria-label="Default select example" onChange={languageHandler}>
            <option value="english">english</option>
            <option value="hindi">hindi</option>
          </Form.Select>
        </div>
        <div className='mb-3'>
          <label>Password</label>
          <input
            type="password"
            className="form-control"
            placeholder="Enter password"
            required
            onChange={passHandler}
          />
        </div>

        <div className="d-grid">
          <button onClick={submitHandler} type='submit' className="btn btn-primary">
            Register
          </button>
        </div>
        <p className="forgot-password text-right">
          already registered <Link to="/sign-in">Login?</Link>
        </p>
        <p style={{ color: "red" }}>{message}</p>
      </form>
    </div>
  )

}
