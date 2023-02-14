"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
const express_1 = __importDefault(require("express"));
const trainStation_controller_1 = __importDefault(require("../controllers/trainStation.controller"));
const validateTrainStation_1 = require("../middleware/validateTrainStation");
const router = express_1.default.Router();
router.get("/getTrainsFrom/:trainFrom", trainStation_controller_1.default.readTrainsFrom);
router.get("/getStation/:trainStation_Id", trainStation_controller_1.default.readATrainStation);
router.get("/getAllStations/", trainStation_controller_1.default.readAllTrainStations);
router.delete("/deleteStation/:trainStation_Id", trainStation_controller_1.default.deleteATrainStation);
router.post("/createStation", (0, validateTrainStation_1.ValidateTrainStation)(validateTrainStation_1.TrainStationSchema.trainStation.create), trainStation_controller_1.default.createATrainStation);
router.patch("/updateStation/:trainStation_Id", (0, validateTrainStation_1.ValidateTrainStation)(validateTrainStation_1.TrainStationSchema.trainStation.update), trainStation_controller_1.default.updateATrainStation);
module.exports = router;
