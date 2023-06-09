import style from '../styles/landing.module.css';
import union from '../assets/landing.jpg';
import { useEffect, useState } from "react";
import { useSelector } from 'react-redux';
import { NavLink, useNavigate } from "react-router-dom";
import Login from "./Login";
import Register from "./Register";

export default function Landing() {
  const navigate = useNavigate();
  const { access } = useSelector(state => state.user);
  const [boton, setBoton] = useState({
    login: false,
    register: false
  });
  function changeLogin() {
    setBoton({
      login: true,
      register: false
    });
  }
  function changeRegister() {
    setBoton({
      login: false,
      register: true
    });
  }
  useEffect(() => {
    if (access === true) navigate("/home");
  }, [access]);
  return (
    <>
      <header className={style.header}>
        <button onClick={changeLogin}>Sign in</button>
        <button onClick={changeRegister}>Sign up</button>
      </header>
      <main className={style.landing}>
        {
          boton.login === true
          ? <Login />
          : null
        }
        {
          boton.register === true
          ? <Register />
          : null
        }
        {
          boton.login === false && boton.register === false
          ? <aside className={style.init}>
            <img src={union} alt="inicio" />
            <NavLink to='/home'>Log in as guest</NavLink>
          </aside>
          : null
        }
      </main>
    </>
  );
}