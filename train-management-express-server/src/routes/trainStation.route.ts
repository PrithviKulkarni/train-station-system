import express from "express";
import controller from "../controllers/trainStation.controller";
import { TrainStationSchema, ValidateTrainStation } from "../middleware/validateTrainStation";

const router = express.Router();

router.get("/getTrainsFrom/:trainFrom", controller.readTrainsFrom);
router.get("/getStation/:trainStation_Id", controller.readATrainStation);
router.get("/getAllStations/", controller.readAllTrainStations);
router.delete("/deleteStation/:trainStation_Id", controller.deleteATrainStation);
router.post(
  "/createStation",
  ValidateTrainStation(TrainStationSchema.trainStation.create),
  controller.createATrainStation
);
router.patch(
  "/updateStation/:trainStation_Id",
  ValidateTrainStation(TrainStationSchema.trainStation.update),
  controller.updateATrainStation
);

export = router;
