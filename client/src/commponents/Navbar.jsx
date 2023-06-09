import style from '../styles/navbar.module.css';
import { useDispatch, useSelector } from "react-redux";
import { NavLink, useNavigate } from "react-router-dom";
import { resetUser } from '../redux/userSlice';

export default function Navbar({ changeNav }) {
  const { access } = useSelector(state => state.user);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  function logOut() {
    dispatch(resetUser());
    navigate("/");
  }
  return (
    <nav className={style.nav}>
      <div className={style.contain}>
        <button onClick={changeNav}>✖</button>
        <NavLink onClick={changeNav} to="/home">Home</NavLink>
        <NavLink onClick={changeNav} to="/activity">Activity</NavLink>
        {
          access === true
          ? <NavLink onClick={() => {changeNav(); logOut()}} to="/">Log out</NavLink>
          : <NavLink onClick={changeNav} to="/">Exit</NavLink>
        }
      </div>
    </nav>
  );
}