import db from '../db.js';

const { Activity, Country, User } = db;

async function getActivities(req, res) {
  try {
    const activities = await Activity.findAll({
      include: [
        { model: User, required: false },
        { model: Country, required: false }
      ]
    });
    return res.status(200).json(activities);
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
}
async function postActivity(req, res) {
  try {
    const { name, difficulty, duration, season, userId, countries } = req.body;
    if (!userId || !name || !difficulty || !duration || !season || countries.length === 0) return res.status(404).json({ error: "Data is missing" });
    const [activity, created] = await Activity.findOrCreate({
      where: { name },
      defaults: {
        name,
        difficulty,
        duration,
        season
      }
    });
    if (created === false) return res.status(403).json({ error: "That activity already exists"});
    const user = await User.findByPk(userId);
    if (!user) return res.status(403).json({ error: "The user does not exist" });
    await user.addActivity(activity);
    await activity.addCountries(countries);
    const activities = await Activity.findAll({
      include: [User, Country]
    });
    return res.status(200).json(activities);
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
}
export { getActivities, postActivity };