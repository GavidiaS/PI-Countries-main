import db from '../db.js';
import axios from 'axios';
import { Op } from 'sequelize';

const { Country, Activity, User } = db;

async function getCountries() {
  try {
    const dtCountries = await Country.findAll();
    if (dtCountries.length !== 0) return dtCountries;
    const { data } = await axios("http://localhost:5000/countries");
    if (!data) return { message: "Data is missing" };
    const countries = data.map(cn => {
      const country = {
        id: cn.cca3,
        name: cn.name.common,
        flag: cn.flags.svg,
        continent: cn.continents[0],
        capital: cn.capital ? cn.capital[0] : "",
        subregion: cn.subregion ? cn.subregion : "",
        area: cn.area,
        population: cn.population
      };
      return country;
    });
    const dbCountries = await Country.bulkCreate(countries);
    if (!dbCountries) return { message: "Country is missing" };
    return dbCountries;
  } catch (error) {
    return { error: error.message };
  }
}
async function getCountryByName(name) {
  try {
    const countries = await Country.findAll({
      where: { name: { [Op.iLike]: "%" + name + "%" } }
    });
    if (!countries || countries.length === 0) return { message: "No country found" };
    return countries;
  } catch (error) {
    return { error: error.message };
  }
}
async function getAllCountries(req, res) {
  try {
    const { name } = req.query;
    const data = (name && /^[a-zA-Z\s]+$/.test(name))
    ? await getCountryByName(name)
    : await getCountries();
    if (data.message) return res.status(404).json({ message: data.message });
    return res.status(200).json(data);
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
}
async function getCountryById(req, res) {
  try {
    const { id } = req.params;
    const country = await Country.findByPk(id, {
      include: [
        { model: Activity, required: false },
        { model: User, required: false }
      ]
    });
    if (!country) return res.status(404).json({ message: "Country not found" });
    return res.status(200).json(country);
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
}
export { getAllCountries, getCountryByName, getCountries, getCountryById };