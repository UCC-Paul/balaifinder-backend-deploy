import express from "express";
import { rellogin, relregister, rellogout } from "../controllers/relauth.js";

const router = express.Router();

router.post("/rellogin", rellogin);
router.post("/relregister", relregister);
router.post("/rellogout", rellogout);

export default router;
