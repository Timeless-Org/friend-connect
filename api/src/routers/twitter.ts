import router from "express";
import {
  generateAuthLinkServiceController,
  redirectAuthLinkController,
} from "../controllers/twitter";
import cors from "cors";
const routers = router.Router();

routers.get(
  "/auth-link",
  generateAuthLinkServiceController,
);
routers.get("/callback", redirectAuthLinkController);

export default routers;
