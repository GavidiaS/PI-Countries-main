import style from "../styles/user.module.css";
import { useSelector } from "react-redux";

export default function Profile() {
  const { first_name, last_name, country } = useSelector(state => state.user);
  return (
    <main className={style.profile}>
      <aside className={style.contain}>
        <figure>
          <img src={country.flag} alt={country.name} />
        </figure>
        <div>
          <h1>{first_name} {last_name}</h1>
          <h3>country: <span>{country.name}</span></h3>
        </div>
      </aside>
    </main>
  );
}