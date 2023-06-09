import style from '../styles/login.module.css';
import siVisible from '../assets/ojo-visible.png';
import noVisible from '../assets/visible.png';
import { useDispatch } from 'react-redux';
import { useState } from "react";
import { getLogin } from '../redux/userSlice';
import { NavLink } from 'react-router-dom';

const regexEmail = /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i;
const regexPassword = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[$@$!%*?&])[A-Za-z\d$@$!%*?&]{8,16}/;

export default function Login() {
  const dispatch = useDispatch();
  const [visible, setVisible] = useState(false);
  const [user, setUser] = useState({
    email: "",
    password: ""
  });
  const [error, setError] = useState({
    email: "",
    password: ""
  });
  function changeVisible(e) {
    e.preventDefault();
    setVisible(!visible);
  }
  function validate(inputs) {
    const errors = {};
    if (!inputs.email) errors.email = "The email is required";
    if (!inputs.password) errors.password = "The password is required";
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
  function handleSubmit(e) {
    e.preventDefault();
    const aux = Object.keys(error);
    if (aux.length !== 0) return alert("Invalid data");
    dispatch(getLogin(user));
    setUser({
      email: "",
      password: ""
    });
    setError({
      email: "",
      password: ""
    });
  }
  return (
    <aside className={style.login}>
      <form onSubmit={handleSubmit} className={style.form}>
        <label>
          <input autoComplete='on' type="email" name='email' value={user.email} onChange={handleChange} placeholder="example@example.com" />
          <span>{error.email}</span>
        </label>
        <label>
          <input autoComplete='off' type={visible ? "text" : "password"} name='password' value={user.password} onChange={handleChange} placeholder="********" />
          <button onClick={changeVisible}><img src={visible ? siVisible : noVisible} alt="Ojo" /></button>
          <span>{error.password}</span>
        </label>
        <button disabled={Object.keys(error).length === 0 ? false : true}>Enter</button>
      </form>
      <NavLink to='/home'>Log in as guest</NavLink>
    </aside>
  );
}