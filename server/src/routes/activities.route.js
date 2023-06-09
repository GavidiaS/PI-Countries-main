import { Router } from "express";
import { getActivities, postActivity } from '../controllers/activities.controller.js';

const router = Router();

router.get("/", getActivities);
router.post("/", postActivity);

export default router;