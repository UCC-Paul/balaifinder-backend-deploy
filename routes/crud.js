import  express from "express";
import { getproperties, addproperties, updproperties, delproperties } from "../controllers/crud.js";

const router = express.Router();

router.get("/getproperties", getproperties);
router.post("/addproperties", addproperties);
router.put("/updproperties/:id", updproperties);
router.delete("/delproperties/:id", delproperties);

export default router;