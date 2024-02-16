import router from "express";
import {
  createKeyNftController,
  getHoldKeyAmountController,
  getHoldKeyController,
  getHolderKeyAmountController,
  getKeyNFTHolderController,
  getTradeProfitController,
} from "../controllers/nft";

const routers = router.Router();

routers.post("/", createKeyNftController);
routers.get("/hold-key/:address", getHoldKeyController);
routers.get("/hold-key/amount/:address", getHoldKeyAmountController);
routers.get("/holder-key/:address", getKeyNFTHolderController);
routers.get("/holder-key/amount/:address", getHolderKeyAmountController);
routers.get("/trade-profit/:address", getTradeProfitController);

export default routers;
