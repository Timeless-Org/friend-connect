import { app } from "./app";
import { APP_PORT } from "./lib/config";

try {
  app.listen(APP_PORT, () => {
    console.log("Friend Connect");
  });
} catch (err) {
  if (err instanceof Error) {
    console.error(err.message);
  }
}
