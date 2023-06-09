import { Router } from 'express';
import user from './user.route.js';
import activity from './activities.route.js';
import countries from './countries.route.js';

const router = Router();

router.use("/login", user);
router.use("/activities", activity);
router.use("/countries", countries);

export default router;