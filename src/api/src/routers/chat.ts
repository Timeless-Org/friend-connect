import router from "express";

const routers = router.Router();

routers.get("/all/:address");
routers.get("/latest");
routers.get("/:address");
routers.get("/");
routers.get("/");

export default routers;
