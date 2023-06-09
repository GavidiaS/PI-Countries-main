import style from '../styles/paginate.module.css';
import { useSelector, useDispatch } from "react-redux";
import { handlePage } from '../redux/countrySlice';

export default function Paginate({ cantPages }) {
  const { page } = useSelector(state => state.country);
  const dispatch = useDispatch();
  const numbers = [];
  for (let i = 1; i <= cantPages; i++) {
    numbers.push(i);
  }
  function numPage(n) {
    dispatch(handlePage(n));
  }
  return (
    <aside className={style.paginate}>
      <div className={style.contain}>
        {
          numbers?.map(num => {
            return (
              <button key={num} onClick={() => {numPage(num)}}>{num}</button>
            );
          })
        }
      </div>
    </aside>
  );
}