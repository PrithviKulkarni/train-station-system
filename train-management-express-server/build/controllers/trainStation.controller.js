"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importDefault(require("mongoose"));
const trainStation_model_1 = __importDefault(require("../models/trainStation.model"));
const logger_1 = require("../logger");
const readATrainStation = (req, res, next) => {
    const trainStation_Id = req.params.trainStation_Id;
    logger_1.logger.info("trainstation read");
    return trainStation_model_1.default.findById(trainStation_Id)
        .then((trainStation) => trainStation
        ? res.status(200).json({ trainStation })
        : res.status(404).json({
            message: "TrainStation NOT found",
        }))
        .catch((error) => res.status(500).json({ error }));
};
const readTrainsFrom = (req, res, next) => {
    const trainFrom = req.params.trainFrom;
    logger_1.logger.info("trainstation read from station");
    return trainStation_model_1.default.aggregate([
        { $match: { "trains.station_from": trainFrom.toLowerCase() } },
        {
            $project: {
                trains: {
                    $filter: {
                        input: "$trains",
                        as: "trains",
                        cond: {
                            $eq: ["$$trains.station_from", trainFrom.toLowerCase()],
                        },
                    },
                },
            },
        },
    ])
        .then((trainStation) => trainStation
        ? res.status(200).json({ trainStation })
        : res.status(404).json({
            message: "TrainStation NOT found",
        }))
        .catch((error) => res.status(500).json({ error }));
};
const readAllTrainStations = (req, res, next) => {
    logger_1.logger.info("all stations read");
    return trainStation_model_1.default.find({})
        .then((trainStation) => res.status(200).json({ trainStation }))
        .catch((error) => res.status(500).json({ error }));
};
const createATrainStation = (req, res, next) => {
    const { location, trains } = req.body;
    logger_1.logger.info("trainstation created");
    const trainStation = new trainStation_model_1.default({
        _id: new mongoose_1.default.Types.ObjectId(),
        location,
        trains
    });
    return trainStation
        .save()
        .then((trainStation) => res.status(201).json({ trainStation }))
        .catch((error) => res.status(500).json({ error }));
};
const updateATrainStation = (req, res, next) => {
    const trainStation_Id = req.params.trainStation_Id;
    logger_1.logger.info("trainstation updated");
    return trainStation_model_1.default.findById(trainStation_Id)
        .then((trainStation) => {
        if (trainStation) {
            trainStation.set(req.body);
            return trainStation
                .save()
                .then((trainStation) => res.status(201).json({ trainStation }))
                .catch((error) => res.status(500).json({ error }));
        }
        else {
            res.status(404).json({ message: "Train Station NOT found" });
        }
    })
        .catch((error) => res.status(500).json({ error }));
};
const deleteATrainStation = (req, res, next) => {
    const trainStation_Id = req.params.trainStation_Id;
    logger_1.logger.info("trainstation deleted");
    return trainStation_model_1.default.findByIdAndDelete(trainStation_Id)
        .then((trainStation) => trainStation
        ? res.status(201).json({ message: "Train Station Deleted" })
        : res.status(404).json({
            message: "Train Station NOT found",
        }))
        .catch((error) => res.status(500).json({ error }));
};
exports.default = {
    createATrainStation,
    readATrainStation,
    readAllTrainStations,
    updateATrainStation,
    deleteATrainStation,
    readTrainsFrom,
};
