import 'dotenv/config'
import { Sequelize } from 'sequelize';
import models from './models/index.js';

const { DB_USER, DB_PASSWORD, DB_HOST, DB_NAME } = process.env;
const { users, countries, activities } = models;

const sequelize = new Sequelize(`postgres://${DB_USER}:${DB_PASSWORD}@${DB_HOST}/${DB_NAME}`, { logging: false, native: false });

users(sequelize);
countries(sequelize);
activities(sequelize);

const { User, Country, Activity } = sequelize.models;

Country.hasMany(User);
User.belongsTo(Country);

User.hasMany(Activity);
Activity.belongsTo(User);

Country.belongsToMany(Activity, { through: "countryActivity", timestamps: false });
Activity.belongsToMany(Country, { through: "countryActivity", timestamps: false });

export default {
  ...sequelize.models,
  conn: sequelize
};