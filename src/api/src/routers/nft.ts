import router from "express";

const routers = router.Router();

routers.post("/");
routers.get("/hold-key/:address");
routers.get("/hold-key/amount/:address");
routers.get("/holder-key/:address");
routers.get("/holder-key/amount/:address");
routers.get("/trade-profit/:address");

export default routers;
