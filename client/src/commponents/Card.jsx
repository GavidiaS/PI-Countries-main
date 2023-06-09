import style from '../styles/card.module.css';
import { NavLink } from "react-router-dom";

export default function Card(props) {
  const { id, name, flag, continent } = props;
  return (
    <article className={style.card}>
      <div className={style.contain}>
        <h2>{name}</h2>
        <figure>
          <img src={flag} alt={name} />
        </figure>
        <h3>{continent}</h3>
        <NavLink to={`/detail/${id}`}>View details</NavLink>
      </div>
    </article>
  );
}