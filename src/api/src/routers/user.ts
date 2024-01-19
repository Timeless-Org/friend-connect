import router from "express";

const routers = router.Router();

routers.post("/");
routers.get("/:address");
routers.put("/:address");
routers.get("/watchlists/:address");
routers.put("/watchlist");
routers.put("/notification");
routers.get("/search/:keyword");
routers.get("/top-price-users");

export default routers;
