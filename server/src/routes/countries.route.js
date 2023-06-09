import { Router } from "express";
import { getAllCountries, getCountryById } from '../controllers/countries.controller.js';

const router = Router();

router.get("/", getAllCountries);
router.get("/:id", getCountryById);

export default router;