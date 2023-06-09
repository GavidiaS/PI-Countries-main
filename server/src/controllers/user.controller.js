import db from '../db.js';

const { User, Country, Activity } = db;

async function login(req, res) {
  try {
    const { email, password } = req.query;
    if (!email || !password) return res.status(404).json({ error: "Data is missing" });
    const user = await User.findOne({
      where: { email },
      include: [{
        model: Country,
        include: [{ model: Activity, required: false }]
      }]
    });
    if (!user) return res.status(404).json({ error: "That email does not exist" });
    if (user.password !== password) return res.status(403).json({ error: "The password is incorrect" });
    return res.status(200).json({ access: true, user: user });
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
}
async function register(req, res) {
  try {
    const { first_name, last_name, email, password, countryId } = req.body;
    if (!first_name || !last_name || !email || !password || !countryId) return res.status(404).json({ error: "Data is missing" });
    const [user, created] = await User.findOrCreate({
      where: { email },
      defaults: {
        first_name,
        last_name,
        email,
        password
      }
    });
    if (created === false) return res.status(403).json({ error: "That email already exists" });
    const country = await Country.findByPk(countryId);
    if (!country) return res.status(404).json({ error: "Country not found" });
    await country.addUser(user);
    return res.status(200).json({ message: "User created successfully" });
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
}
export { login, register };