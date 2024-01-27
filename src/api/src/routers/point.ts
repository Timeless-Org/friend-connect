import router from "express";
import { getLatestPointController } from "../controllers/point";

const routers = router.Router();

routers.get("/latest/:address", getLatestPointController);

export default routers;
