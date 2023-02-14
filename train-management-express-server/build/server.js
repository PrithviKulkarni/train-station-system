"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const mongoose_1 = __importDefault(require("mongoose"));
const config_1 = require("./config/config");
const http_1 = __importDefault(require("http"));
const cors_1 = __importDefault(require("cors"));
const trainStation_route_1 = __importDefault(require("./routes/trainStation.route"));
const booking_route_1 = __importDefault(require("./routes/booking.route"));
const logger_1 = require("./logger");
const router = (0, express_1.default)();
mongoose_1.default
    .connect(config_1.config.mongo.url)
    .then(() => {
    logger_1.logger.info("Hello world!");
    StartServer();
})
    .catch((error) => {
    console.log("ERROR connecting to DB", error);
});
const StartServer = () => {
    router.use(express_1.default.urlencoded({ extended: true }));
    router.use(express_1.default.json());
    router.use((0, cors_1.default)());
    router.use("/trainStation", trainStation_route_1.default);
    router.use("/booking", booking_route_1.default);
    router.use((req, res, next) => {
        res.header("Access-Control-Allow-Origin", "*");
        res.header("Access-Control-Allow-Header", "Origin, X-Requested-With, Content-Type, Accept, Authorization");
        if (req.method == "OPTIONS") {
            res.header("Access-Control-Allow-Methods", "PUT, POST, PATCH, DELETE, GET");
        }
        next();
    });
    router.get("/chks", (req, res, next) => res.status(200).json({ message: "Healthcheck Success" }));
    router.use((req, res, next) => {
        const error = new Error("ERROR: Request Not Found");
        console.log(error);
        return res.status(404).json({ message: error.message });
    });
    http_1.default.createServer(router).listen(config_1.config.server.port, () => {
        console.log(`Server is running on port ${config_1.config.server.port}.`);
    });
};
