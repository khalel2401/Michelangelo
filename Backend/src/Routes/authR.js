import { Router } from "express";
import { login } from "../Controllers/authC.js";

const router  = Router();

router.post("/login",login);

export default router;