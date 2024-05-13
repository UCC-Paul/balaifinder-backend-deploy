import express from "express";
import { rellogin, relregister, rellogout, verifyEmail } from "../controllers/relauth.js";

const router = express.Router();

router.post("/rellogin", rellogin);
router.post("/relregister", relregister);
router.post("/rellogout", rellogout);
router.put("/verify/:token", verifyEmail);

export default router;
