import router from "express";
import { createMessageController } from "../controllers/message";

const routers = router.Router();

routers.post("/", createMessageController);

export default routers;
