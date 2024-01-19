import router from "express";

const routers = router.Router();

routers.post("/");
routers.get("/latest/:address");
routers.post("/points");

export default routers;
