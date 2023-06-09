import style from '../styles/relations.module.css';

export default function Relations({ arrayObj, name, title, fnChange }) {
  return (
    <article className={style.relations}>
      <div className={style.contain}>
        <button onClick={fnChange}>✖</button>
        <h2>{title} {name}</h2>
        <ol>
          {
            arrayObj?.map(obj => {
              return (
                <li key={obj.id}>{obj.name ? obj.name : obj.first_name}</li>
              );
            })
          }
        </ol>
      </div>
    </article>
  );
}