import router from "express";
import {
  createTradeController,
  getUserTradeController,
  getHolderTradeController,
  getWatchlistTradeController,
  getAllTradeController,
  getLatestTrade50Controller,
} from "../controllers/trade";

const routers = router.Router();

routers.get("/:address", getUserTradeController);
routers.post("/", createTradeController);
routers.get("/holder/:address", getHolderTradeController);
routers.get("/watchlist/:address", getWatchlistTradeController);
routers.get("/all/:address", getAllTradeController);
routers.get("/latest", getLatestTrade50Controller);

export default routers;
