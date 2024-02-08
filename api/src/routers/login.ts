import router from "express";
import { ConnectTwitterController, VerifyCodeController } from "../controllers/login";

const routers = router.Router();

routers.put("/twitter", ConnectTwitterController);
routers.post("/code", VerifyCodeController);

export default routers;
