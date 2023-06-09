import { Router } from "express";
import { login, register } from '../controllers/user.controller.js';

const router = Router();

router.get("/", login);
router.post("/", register);

export default router;