import cors from "cors";

import { ALLOWED_ORIGIN, ALLOWED_ORIGINS, NODE_ENV } from "../utils/config";

export const validateOrigin = cors({
  origin: (origin, callback) => {
    if (NODE_ENV === "local" || !origin) {
      return callback(null, true);
    }
    if (ALLOWED_ORIGIN === origin) {
      return callback(null, true);
    }
    if (ALLOWED_ORIGINS.some((allowOrigin) => origin?.match(new RegExp(allowOrigin)))) {
      console.log(`ALLOWED_ORIGINS: ${ALLOWED_ORIGINS}`);
      return callback(null, true);
    }

    const msg =
      `The CORS policy for this site does not allow access from the specified Origin. ` + `[origin: ${origin}]`;
    return callback(new Error(msg), false);
  },
  credentials: true,
});
