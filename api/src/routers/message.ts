import router from "express";
import { createMessageController } from "../controllers/message";

const routers = router.Router();

routers.post("/message", createMessageController);

export default routers;
