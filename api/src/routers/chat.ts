import router from "express";

import { getLatestChatController, getUserAllChatController, getUserChatController } from "../controllers/chat";

const routers = router.Router();

routers.get("/latest", getLatestChatController);
routers.get("/all/:address", getUserAllChatController);
routers.get("/:address", getUserChatController);

export default routers;
