import "dotenv/config";
import config from "config";
import db from "./config/db";
import {app} from "./server";
import {keys} from "./config/keys";

let port: any = null;
if (process.env.NODE_ENV === "production") port = keys.PORT_PRODUCTION || 8080;
else port = keys.PORT_DEVELOPMENT || 3030;


/**
 * Connect to the Database
 */
module.exports = app.listen(port, async () => {
  await db();
  console.log(`Server running on port ${port}`);
});
