import express, {Express} from "express";
import dotenv from "dotenv";
dotenv.config();
import morgan from "morgan";
import { userRoute } from "./app/users/user.route";
import globalErrorHandler from "./utility/globalErrorHandler";
import expressWinston from 'express-winston'
import { transports, format } from "winston";
import { logger, requestLogger } from "./logger";
import { profileRoute } from "./app/profile/profile.route";
import { campaignRoute } from "./app/campaigns/campaign.route";

const app: Express = express();
const router = express.Router();

/**
 * Middleware
 */
app.use(express.urlencoded({extended: true}));
app.use(express.json());
app.use(express.raw());
app.use(express.text());
app.use(morgan("dev"));
// app.use(cors())
// app.use(mongoSanitize()) //Use for security to prevent NoSql injections
// app.use(helmet()) //Adds extra headers to protect the routes
// app.use(xss()) //To prevent a harmful script being sent with the POST request
// app.use(hpp()) //To prevent HTTP Parameter Pollution.


/**Logger */
app.use(expressWinston.logger({
  winstonInstance: requestLogger,
  statusLevels: true
}))

expressWinston.requestWhitelist.push('body')
expressWinston.responseWhitelist.push('body')

/** Routes */
app.use("/api/v1", router);
userRoute(router);
profileRoute(router);
campaignRoute(router);

app.get("*", (req, res, next) => {
  res.send("Integration successful");
});


/** Internal error logger */
app.use(expressWinston.errorLogger({
  winstonInstance: logger,
}))
// app.use(expressWinston.errorLogger({
//   transports: [
//     new transports.File({
//       filename: 'src/main/logger/internalLogs.log'
//     })
//   ],  
//   format: format.combine(
//     format.json(),format.timestamp({format: "MMM-DD-YYYY HH:mm:ss"}), 
//   ),
// }))


/** Global error handlers */
app.use(globalErrorHandler)


export {app};
