import 'dotenv/config';
import app from './src/app.js';
import db from './src/db.js';

const { PORT } = process.env;
const { conn } = db;

conn.sync({ force: false }).then(() => {
  app.listen(PORT, () => {
    console.log(`Server listenig on port ${PORT}`);
  });
}).catch(error => console.error(error));