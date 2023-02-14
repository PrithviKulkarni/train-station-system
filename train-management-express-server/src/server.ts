import express from "express";
import mongoose from "mongoose";
import { config } from "./config/config";
import http from "http";
import cors from "cors"
import trainStationRoutes from "./routes/trainStation.route";
import bookingRoutes from "./routes/booking.route";
import { logger } from "./logger";

const router = express();
mongoose
  .connect(config.mongo.url)
  .then(() => {
    logger.info("Hello world!"); 
    StartServer();
  })
  .catch((error) => {
    console.log("ERROR connecting to DB", error);
  });
  

const StartServer = () => {
  router.use(express.urlencoded({ extended: true }));
  router.use(express.json());
  router.use(cors())
  router.use("/trainStation", trainStationRoutes);
  router.use("/booking", bookingRoutes);

  router.use((req, res, next) => {
    res.header("Access-Control-Allow-Origin", "*");
    res.header(
      "Access-Control-Allow-Header",
      "Origin, X-Requested-With, Content-Type, Accept, Authorization"
    );

    if (req.method == "OPTIONS") {
      res.header(
        "Access-Control-Allow-Methods",
        "PUT, POST, PATCH, DELETE, GET"
      );
    }
    next();
  });

  router.get("/chks", (req, res, next) =>
    res.status(200).json({ message: "Healthcheck Success" })
  );

  router.use((req, res, next) => {
    const error = new Error("ERROR: Request Not Found");
    console.log(error);

    return res.status(404).json({ message: error.message });
  });

  http.createServer(router).listen(config.server.port, () => {
    console.log(`Server is running on port ${config.server.port}.`);
  });
};
