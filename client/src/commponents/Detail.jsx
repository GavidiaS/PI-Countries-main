import style from '../styles/detail.module.css';
import { useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { getCountryById, resetCountry } from "../redux/countrySlice";
import { useEffect, useState } from "react";
import Relations from './Relations';

export default function Detail() {
  const [user, setUser] = useState(false);
  const [activity, setActivity] = useState(false);
  const { id } = useParams();
  const { country } = useSelector(state => state.country);
  const dispatch = useDispatch();
  function changeUser() {
    setUser(!user);
  }
  function changeActivity() {
    setActivity(!activity);
  }
  useEffect(() => {
    dispatch(getCountryById(id));
    return () => {
      dispatch(resetCountry());
    }
  }, [dispatch, id]);
  return (
    <main className={style.detail}>
      <aside className={style.contain}>
        <figure>
          <img src={country.flag} alt={country.name} />
        </figure>
        <div>
          <h1>{country.name}</h1>
          {
            country.capital !== ""
            ? <h2>Capital: <span>{country.capital}</span></h2>
            : null
          }
          {
            country.subregion !== ""
            ? <h2>Region: <span>{country.subregion}</span></h2>
            : null
          }
          <h2>Continent: <span>{country.continent}</span></h2>
          <h2>Area: <span>{country.area}</span></h2>
          <h2>Population: <span>{country.population}</span></h2>
          {
            country.Users?.length !== 0
            ? <button onClick={changeUser}>Users from {country.name}</button>
            : null
          }
          {
            country.Activities?.length !== 0
            ? <button onClick={changeActivity}>Tourist activities in {country.name}</button>
            : null
          }
        </div>
      </aside>
        {
          activity === true
          ? <Relations name={country.name} fnChange={changeActivity} arrayObj={country.Activities} title="Tourist activities in" />
          : null
        }
        {
          user === true
          ? <Relations name={country.name} fnChange={changeUser} arrayObj={country.Users} title="Users from" />
          : null
        }
    </main>
  );
}