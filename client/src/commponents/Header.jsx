import style from '../styles/header.module.css'
import filtro from '../assets/filtrar.png';
import lupa from '../assets/buscar.png';
import menu from '../assets/menu.png';
import { useLocation } from "react-router-dom";
import { useState } from 'react';
import Searchbar from "./Searchbar";
import Navbar from "./Navbar";
import Filters from './Filters';

export default function Header() {
  const [filter, setFilter] = useState(false);
  const [search, setSearch] = useState(false);
  const [nav, setNav] = useState(false);
  const location = useLocation();
  function changeFilter() {
    setFilter(!filter);
  }
  function changeSearch() {
    setSearch(!search);
  }
  function changeNav() {
    setNav(!nav)
  }
  return (
    <header className={style.header}>
      <button onClick={changeNav}><img src={menu} alt="Menu" /></button>
      {
        nav === true
        ? <Navbar changeNav={changeNav} />
        : null
      }
      {
        location.pathname === "/home"
        ? <button onClick={changeFilter}><img src={filtro} alt="Filter" /></button>
        : null
      }
      {
        filter === true
        ? <Filters changeFilter={changeFilter} />
        : null
      }
      {
        location.pathname === "/home"
        ? <button onClick={changeSearch}><img src={lupa} alt="Search" /></button>
        : null
      }
      {
        search === true
        ? <Searchbar changeSearch={changeSearch} />
        : null
      }
    </header>
  );
}