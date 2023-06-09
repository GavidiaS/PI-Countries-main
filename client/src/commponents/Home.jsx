import style from '../styles/home.module.css';
import { useSelector } from 'react-redux';
import { NavLink } from 'react-router-dom';
import Card from './Card';
import Paginate from './Paginate';

export default function Home() {
  const { countries, page } = useSelector(state => state.country);
  const { access } = useSelector(state => state.user);
  let start = (page - 1) * 10;
  let end = page * 10;
  let cantPages = Math.ceil(countries.length/10);
  let viewCountries = countries.slice(start,end);
  return (
    <main className={style.home}>
      {
        viewCountries.map(cn => {
          return (
            <Card
              key={cn.id}
              id={cn.id}
              name={cn.name}
              flag={cn.flag}
              continent={cn.continent}
            />
          );
        })
      }
      <Paginate cantPages={cantPages} />
      {
        access === true
        ? <NavLink to="/addActivity" className={style.add}>Add Activity</NavLink>
        : null
      }
    </main>
  );
}