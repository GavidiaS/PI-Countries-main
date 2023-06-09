import style from '../styles/register.module.css';
import siVisible from '../assets/ojo-visible.png';
import noVisible from '../assets/visible.png';
import { useSelector } from "react-redux";
import { NavLink, useNavigate } from "react-router-dom";
import { useState } from "react";
import axios from 'axios';

const regexFirstName = /^[A-Z][a-zA-ZáéíóúÁÉÍÓÚñÑ\s']+$/;
const regexLastName = /^[A-Z][a-zA-ZáéíóúÁÉÍÓÚñÑ\s']+$/;
const regexEmail = /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i;
const regexPassword = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[$@$!%*?&])[A-Za-z\d$@$!%*?&]{8,16}/;

export default function Register() {
  const { countriesOrigin } = useSelector(state => state.country);
  const navigate = useNavigate();
  const [visible, setVisible] = useState(false);
  const [user, setUser] = useState({
    first_name: "",
    last_name: "",
    email: "",
    password: "",
    countryId: ""
  });
  const [error, setError] = useState({
    first_name: "",
    last_name: "",
    email: "",
    password: "",
    countryId: ""
  });
  function changeVisible(e) {
    e.preventDefault();
    setVisible(!visible);
  }
  function validate(inputs) {
    const errors = {};
    if (!inputs.first_name) errors.first_name = "First Name is required";
    if (!inputs.last_name) errors.last_name = "Last Name is required";
    if (!inputs.email) errors.email = "The email is required";
    if (!inputs.password) errors.password = "The password is required";
    if (!inputs.countryId) errors.countryId = "The country is required";
    if (!regexFirstName.test(inputs.first_name) && inputs.first_name.length > 20) errors.first_name = "First Name must be valid";
    if (!regexLastName.test(inputs.last_name) && inputs.last_name.length > 20) errors.last_name = "Last Name must be valid";
    if (!regexEmail.test(inputs.email) && inputs.email.length <= 35) errors.email = "The email must be valid";
    if (!regexPassword.test(inputs.password)) errors.password = "The password must be valid";
    return errors;
  }
  function handleChange(e) {
    setUser({
      ...user,
      [e.target.name]: e.target.value
    })
    setError(validate({
      ...user,
      [e.target.name]: e.target.value
    }));
  }
  async function postUser(user) {
    const { data } = await axios.post("http://localhost:3001/spa-countries/login", user);
    if (data.message) return alert(data.message);
    return alert("User not created");
  }
  async function handleSubmit(e) {
    e.preventDefault();
    const aux = Object.keys(error);
    if (aux.length !== 0) return alert("Invalid data");
    await postUser(user);
    setUser({
      first_name: "",
      last_name: "",
      email: "",
      password: "",
      countryId: ""
    });
    setError({
      first_name: "",
      last_name: "",
      email: "",
      password: "",
      countryId: ""
    });
    navigate("/");
  }
  return (
    <aside className={style.register}>
      <form onSubmit={handleSubmit} className={style.form}>
        <label>
          <input type="text" name="first_name" value={user.first_name} onChange={handleChange} placeholder="Enter your first name" />
          <span>{error.first_name}</span>
        </label>
        <label>
          <input type="text" name="last_name" value={user.last_name} onChange={handleChange} placeholder="Enter your last name" />
          <span>{error.last_name}</span>
        </label>
        <label>
          <input type="email" name='email' value={user.email} onChange={handleChange} placeholder="example@example.com" />
          <span>{error.email}</span>
        </label>
        <label>
          <input type={visible ? "text" : "password"} name='password' value={user.password} onChange={handleChange} placeholder="********" />
          <button onClick={changeVisible}><img src={visible ? siVisible : noVisible} alt="Ojo" /></button>
          <span>{error.password}</span>
        </label>
        <label htmlFor='country'>
          <h2>Select your country of birth</h2>
          <input name='countryId' list='country' value={user.countryId} onChange={handleChange} />
          <datalist id='country'>
            {
              countriesOrigin?.map(cn => {
                return <option key={cn.id} value={cn.id}>{cn.name}</option>
              })
            }
          </datalist>
          <span>{error.countryId}</span>
        </label>
        <button disabled={Object.keys(error).length === 0 ? false : true}>Enter</button>
      </form>
      <NavLink to='/home'>Log in as guest</NavLink>
    </aside>
  );
}