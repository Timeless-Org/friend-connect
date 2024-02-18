import router from "express";
import {
  createTradeController,
  getAllTradeController,
  getHolderTradeController,
  getLatestTrade50Controller,
  getUserTradeController,
  getWatchlistTradeController,
} from "../controllers/trade";

const routers = router.Router();

routers.get("/all", getAllTradeController);
routers.get("/:address", getUserTradeController);
routers.post("/", createTradeController);
routers.get("/holder/:address", getHolderTradeController);
routers.get("/watchlist/:address", getWatchlistTradeController);
routers.get("/latest", getLatestTrade50Controller);

export default routers;
