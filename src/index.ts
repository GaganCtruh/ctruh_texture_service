import express from "express";
import cors from "cors";
import router from "./routes/meshRoute";
import { APP_PORT, MONGODB_DB, MONGODB_URI } from "./config";
import mongoose from "mongoose";
import logger from "./logger/logger";
import { appInitializationLogs, getHomePageHTML } from "./lib/helpers/app.helper";
import { addAppMetaHeaders } from "./middlewares/appMeta.middleware";
import { setupMetrics } from "./metrics";

// Enable dotenv if you're using environment variables

const app = express();
const port = APP_PORT || 9000;

app.use(cors()); // Enable CORS with default settings
app.use(express.json());

mongoose
    .connect(MONGODB_URI, { dbName: MONGODB_DB })
    .then(() => logger.info("MongoDB connected"))
    .catch(err => logger.error("MongoDB connection error:", err));

//Add app meta headers X-MS-Name and X-MS-Version
app.use(addAppMetaHeaders);

// Setup service metrics
setupMetrics(app);

app.get("/", (req, res) => res.send(getHomePageHTML()));
app.use("/api/mesh", router);

app.listen(port, async () => {
    appInitializationLogs(port);
});

process.on("uncaughtException", (error: Error) => {
    logger.error("An uncaughtException : ", error);
});

process.on("unhandledRejection", (reason: any, promise: Promise<any>) => {
    const error = reason instanceof Error ? reason : new Error(JSON.stringify(reason));
    throw error;
});
