import router from "express";
import {
  createUserController,
  getTopPriceUsersController,
  getUserController,
  getWatchlistController,
  searchUserController,
  updateNotificationController,
  updateUserController,
  updateWatchlistController,
} from "../controllers/user";

const routers = router.Router();

routers.post("/", createUserController);
routers.get("/watchlists/:address", getWatchlistController);
routers.put("/watchlist", updateWatchlistController);
routers.put("/notification/:address", updateNotificationController);
routers.get("/search/:keyword", searchUserController);
routers.get("/top-price-users", getTopPriceUsersController);
routers.get("/:address", getUserController);
routers.put("/:address", updateUserController);

export default routers;
