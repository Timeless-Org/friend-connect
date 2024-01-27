import router from "express";

import { getUserChatController, getUserAllChatController, getLatestChatController } from "../controllers/chat";

const routers = router.Router();

routers.get("/:address", getUserChatController);
routers.get("/all/:address", getUserAllChatController);
routers.get("/latest", getLatestChatController);

export default routers;
