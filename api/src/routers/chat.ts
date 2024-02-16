import router from "express";

import { getLatestChatController, getUserAllChatController, getUserChatController } from "../controllers/chat";

const routers = router.Router();

routers.get("/:address", getUserChatController);
routers.get("/all/:address", getUserAllChatController);
routers.get("/latest", getLatestChatController);

export default routers;
