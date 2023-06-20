import style from '../styles/creator.module.css';
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { postActivity } from '../redux/countrySlice';

const regexName = /^[A-Z][a-zA-ZáéíóúÁÉÍÓÚñÑ\s']+$/;

export default function Creator() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { countriesOrigin } = useSelector(state => state.country);
  const { id } = useSelector(state => state.user);
  const [act, setAct] = useState({
    name: "",
    difficulty: 0,
    duration: "",
    season: "",
    userId: "",
    countries: []
  });
  const [error, setError] = useState({
    name: "",
    difficulty: 0,
    duration: "",
    season: "",
    countries: []
  });
  function validate(inputsautoComplete ) {
    const errors = {};
    if (!inputsautoComplete .name) errors.name = "Name is required";
    if (!inputsautoComplete .difficulty) errors.difficulty = "Difficulty is required";
    if (!inputsautoComplete .duration) errors.duration = "Duration is required";
    if (!inputsautoComplete .season) errors.season = "Season is required";
    if (!inputsautoComplete .countries) errors.countries = "Countries is required";
    if (!regexName.test(inputsautoComplete .name)) errors.name = "Name must be valid";
    if (inputsautoComplete .difficulty < 1 || inputsautoComplete .difficulty > 5) errors.difficulty = "Dificultad must be in the range of 1 to 5";
    if (inputsautoComplete .season === "") errors.season = "Season must be valid";
    if (inputsautoComplete .countries.length === 0) errors.countries = "Countries is required"
    return errors;
  }
  function handleSelect(e) {
    e.preventDefault();
    const options = e.target.options;
    const selectedOptions = [];
    for (let i in options) {
      if (options[i].selected) {
        selectedOptions.push(options[i].value);
      }
    }
    setAct({ ...act, countries: selectedOptions });
    setError(
      validate({
        ...act,
        countries: selectedOptions
      })
    );
  }
  function handleChange(e) {
    setAct({
      ...act,
      [e.target.name]: e.target.value
    });
    setError(validate({
      ...act,
      [e.target.name]: e.target.value
    }));
  }
  function handleSubmit(e) {
    e.preventDefault();
    const aux = Object.keys(error);
    if (aux.length !== 0) return alert("Data not found");
    dispatch(postActivity(act));
    setAct({
      name: "",
      difficulty: 0,
      duration: "",
      season: "",
      userId: "",
      countries: []
    });
    setError({
      name: "",
      difficulty: 0,
      duration: "",
      season: "",
      countries: []
    });
    navigate("/activity");
  }
  useEffect(() => {
    setAct({
      ...act,
      userId: id
    });
    return () => {
      setAct({
        ...act,
        userId: ""
      });
    };
  }, []);
  return (
    <main className={style.creator}>
      <aside className={style.contain}>
        <form onSubmit={handleSubmit} className={style.form}>
          <label>
            <input autoComplete type="text" name="name" value={act.name} onChange={handleChange} placeholder="Activity Name" />
            <span>{error.name}</span>
          </label>
          <label>
            <h2>Select difficulty</h2>
            <input autoComplete type="range" name="difficulty" value={act.difficulty} onChange={handleChange} min="1" max="5" />
            <span>{error.difficulty}</span>
          </label>
          <label>
          <h2>Activity Duration</h2>
            <input autoComplete type="time" name="duration" value={act.duration} onChange={handleChange} />
            <span>{error.duration}</span>
          </label>
          <label>
          <h2>Select season</h2>
            <input autoComplete list="season" name="season" value={act.season} onChange={handleChange} />
            <datalist id="season">
              <option value="Summer">Summer</option>
              <option value="Fall">Fall</option>
              <option value="Winter">Winter</option>
              <option value="Spring">Spring</option>
            </datalist>
            <span>{error.season}</span>
          </label>
          <label>
            <h2>Select one or more countries</h2>
            <select name="countries" value={act.countries} onChange={handleSelect} multiple>
              {
                countriesOrigin?.map(cn => {
                  return (
                    <option key={cn.id} value={cn.id}>{cn.name}</option>
                  );
                })
              }
            </select>
            <span>{error.countries}</span>
          </label>
          <button disabled={Object.keys(error).length === 0 ? false : true}>Create</button>
        </form>
      </aside>
    </main>
  );
}