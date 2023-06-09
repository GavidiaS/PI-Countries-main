import style from '../styles/activity.module.css';
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

export default function Activity() {
  const { activities } = useSelector(state => state.country);
  const { access } = useSelector(state => state.user);
  const navigate = useNavigate();
  function creator() {
    if (access === true) return navigate("/addActivity");
    return alert("To create a tourist activity, you must not be a guest");
  }
  return (
    <main className={style.activity}>
      <aside className={style.contain}>
        <div className={style.tab}>
          <table>
            <caption>Tourist activities</caption>
            <thead>
              <tr>
                <th>Creator</th>
                <th>Name</th>
                <th>Difficulty</th>
                <th>Duration</th>
                <th>Season</th>
              </tr>
            </thead>
            <tbody>
              {
                activities?.map(act => {
                  return (
                    <tr key={act.id}>
                      <td>{act.User.first_name}</td>
                      <td>{act.name}</td>
                      <td>{act.difficulty}</td>
                      <td>{act.duration}</td>
                      <td>{act.season}</td>
                    </tr>
                  );
                })
              }
            </tbody>
          </table>
        </div>
        <button onClick={creator}>Create a tourist activity</button>
      </aside>
    </main>
  );
}