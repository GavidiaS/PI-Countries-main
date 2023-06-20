import style from '../styles/filters.module.css';
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { filterActivity, filterContinent, orderArea, orderName, orderPopulation, resetCountries, resetPage } from "../redux/countrySlice";

export default function Filters({ changeFilter }) {
  const { activities } = useSelector(state => state.country);
  const [filt, setFilt] = useState({
    continent: "",
    name: "",
    population: "",
    activity: "",
    area: ""
  });
  const dispatch = useDispatch();
  function handleChange(e) {
    setFilt({
      ...filt,
      [e.target.name]: e.target.value
    });
  }
  function handleSubmit() {
    if (filt.activity !== "") dispatch(filterActivity(filt.activity));
    if (filt.continent !== "") dispatch(filterContinent(filt.continent));
    if (filt.name !== "") dispatch(orderName(filt.name));
    if (filt.population !== "") dispatch(orderPopulation(filt.population));
    if (filt.area !== "") dispatch(orderArea(filt.area));
    dispatch(resetPage());
  }
  return (
    <aside className={style.filters}>
      <div className={style.contain}>
        <button onClick={changeFilter}>✖</button>
        <div className={style.fil}>
          <article>
            <h2>Filter by continent:</h2>
            <div onClick={handleChange}>
              <label>Select continent</label>
              <label htmlFor="africa">
                <input id="africa" type="radio" name="continent" value="Africa" disabled={filt.activity !== ""? true : false} />
                <span>Africa</span>
              </label>
              <label htmlFor="antarctica">
                <input id="antarctica" type="radio" name="continent" value="Antarctica" disabled={filt.activity !== ""? true : false} />
                <span>Antarctica</span>
              </label>
              <label htmlFor="asia">
                <input id="asia" type="radio" name="continent" value="Asia" disabled={filt.activity !== ""? true : false} />
                <span>Asia</span>
              </label>
              <label htmlFor="europe">
                <input id="europe" type="radio" name="continent" value="Europe" disabled={filt.activity !== ""? true : false} />
                <span>Europe</span>
              </label>
              <label htmlFor="northamerica">
                <input id="northamerica" type="radio" name="continent" value="North America" disabled={filt.activity !== ""? true : false} />
                <span>North America</span>
              </label>
              <label htmlFor="oceania">
                <input id="oceania" type="radio" name="continent" value="Oceania" disabled={filt.activity !== ""? true : false} />
                <span>Oceania</span>
              </label>
              <label htmlFor="southamerica">
                <input id="southamerica" type="radio" name="continent" value="South America" disabled={filt.activity !== ""? true : false} />
                <span>South America</span>
              </label>
            </div>
          </article>
          <article>
            <h2>Filter by activity:</h2>
            <div onClick={handleChange}>
              <label>Select activity</label>
              {
                activities?.map(act => {
                  return <label htmlFor={act.id} key={act.id}>
                    <input id={act.id} type="radio" name="activity" value={act.name} disabled={filt.continent !== "" ? true : false} />
                    <span>{act.name}</span>
                  </label>
                })
              }
            </div>
          </article>
        </div>
        <div className={style.ord}>
          <article>
            <h2>Order by name:</h2>
            <div onClick={handleChange}>
              <label>Select order</label>
              <label htmlFor="asc">
                <input id="asc" type="radio" name="name" value="A-Z" disabled={filt.population !== "" || filt.area !== "" ? true : false} />
                <span>Ascending</span>
              </label>
              <label htmlFor="desc">
                <input id="desc" type="radio" name="name" value="Z-A" disabled={filt.population !== "" || filt.area !== "" ? true : false} />
                <span>Descending</span>
              </label>
            </div>
          </article>
          <article>
            <h2>Order by population:</h2>
            <div onClick={handleChange}>
              <label>Select order</label>
              <label htmlFor="ascp">
                <input id="ascp" type="radio" name="population" value="Asc" disabled={filt.name !== "" || filt.area !== "" ? true : false} />
                <span>Ascending</span>
              </label>
              <label htmlFor="descp">
                <input id="descp" type="radio" name="population" value="Desc" disabled={filt.name !== "" || filt.area !== "" ? true : false} />
                <span>Descending</span>
              </label>
            </div>
          </article>
          <article>
            <h2>Order by area:</h2>
            <div onClick={handleChange}>
              <label>Select order</label>
              <label htmlFor="asca">
                <input id="asca" type="radio" name="area" value="Asc" disabled={filt.population !== "" || filt.name !== "" ? true : false} />
                <span>Ascending</span>
              </label>
              <label htmlFor="desca">
                <input id="desca" type="radio" name="area" value="Desc" disabled={filt.population !== "" || filt.name !== "" ? true : false} />
                <span>Descending</span>
              </label>
            </div>
          </article>
        </div>
        <div className={style.but}>
          <button onClick={() => { handleSubmit(); changeFilter() }}>Apply</button>
          <button onClick={() => { dispatch(resetCountries()); dispatch(resetPage()); changeFilter() }}>Reset</button>
        </div>
      </div>
    </aside>
  );
}