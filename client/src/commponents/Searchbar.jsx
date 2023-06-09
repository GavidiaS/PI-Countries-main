import style from '../styles/searchbar.module.css';
import { useState } from "react";
import { useDispatch } from "react-redux";
import { getCountriesByName, resetPage } from "../redux/countrySlice";

export default function Searchbar({ changeSearch }) {
  const [name, setName] = useState("");
  const dispatch = useDispatch();
  function handleChange(e) {
    setName(e.target.value);
  }
  function handleSubmit() {
    dispatch(getCountriesByName(name));
    dispatch(resetPage());
  }
  return (
    <section className={style.search}>
      <div className={style.contain}>
        <button onClick={changeSearch}>✖</button>
        <input autoFocus type="search" name="search" value={name} onChange={handleChange} autoComplete="on" placeholder="Search country" />
        <button onClick={() => {
          handleSubmit();
          setName("");
          changeSearch();
        }}>🔍</button>
      </div>
    </section>
  );
}