import './App.css';
import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { Routes, Route, useLocation } from 'react-router-dom';
import { getCountries, getActivities } from './redux/countrySlice';
import Header from './commponents/Header';
import Footer from './commponents/Footer';
import Landing from './commponents/Landing';
import Home from './commponents/Home';
import Detail from './commponents/Detail';
import Activity from './commponents/Activity';
import Creator from './commponents/Creator';

function App() {
  const location = useLocation();
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getCountries());
  }, []);
  useEffect(() => {
    dispatch(getActivities());
  }, []);
  return (
    <>
      {
        location.pathname !== "/"
        ? <Header />
        : null
      }
      <Routes>
        <Route path='/' element={<Landing />} />
        <Route path='/home' element={<Home />} />
        <Route path='/activity' element={<Activity />} />
        <Route path='/detail/:id' element={<Detail />} />
        <Route path='/addActivity' element={<Creator />} />
      </Routes>
      <Footer />
    </>
  )
}

export default App;