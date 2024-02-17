import router from "express";
import { VerifyCodeController } from "../controllers/login";

const routers = router.Router();

routers.post("/code", VerifyCodeController);

export default routers;
