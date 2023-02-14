import { NextFunction, Request, Response } from "express";
import mongoose from "mongoose";
import TrainStation from "../models/trainStation.model";
import { logger } from '../logger';

const readATrainStation = (req: Request, res: Response, next: NextFunction) => {
  const trainStation_Id = req.params.trainStation_Id;

  logger.info("trainstation read")
  return TrainStation.findById(trainStation_Id)
    .then((trainStation) =>
      trainStation
        ? res.status(200).json({ trainStation })
        : res.status(404).json({
            message: "TrainStation NOT found",
          })
    )
    .catch((error) => res.status(500).json({ error }));
};

const readTrainsFrom = (req: Request, res: Response, next: NextFunction) => {
  const trainFrom = req.params.trainFrom;

  logger.info("trainstation read from station")
  return TrainStation.aggregate([
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
    .then((trainStation) =>
      trainStation
        ? res.status(200).json({ trainStation })
        : res.status(404).json({
            message: "TrainStation NOT found",
          })
    )
    .catch((error) => res.status(500).json({ error }));
};

const readAllTrainStations = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  logger.info("all stations read")
  return TrainStation.find({})
    .then((trainStation) => res.status(200).json({ trainStation }))
    .catch((error) => res.status(500).json({ error }));
};

const createATrainStation = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const {
    location,
    trains
  } = req.body;

  logger.info("trainstation created")
  const trainStation = new TrainStation({
    _id: new mongoose.Types.ObjectId(),
    location,
    trains
  });

  return trainStation
    .save()
    .then((trainStation) => res.status(201).json({ trainStation }))
    .catch((error) => res.status(500).json({ error }));
};

const updateATrainStation = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const trainStation_Id = req.params.trainStation_Id;

  logger.info("trainstation updated")
  return TrainStation.findById(trainStation_Id)
    .then((trainStation) => {
      if (trainStation) {
        trainStation.set(req.body);

        return trainStation
          .save()
          .then((trainStation) => res.status(201).json({ trainStation }))
          .catch((error) => res.status(500).json({ error }));
      } else {
        res.status(404).json({ message: "Train Station NOT found" });
      }
    })
    .catch((error) => res.status(500).json({ error }));
};

const deleteATrainStation = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const trainStation_Id = req.params.trainStation_Id;
  
  logger.info("trainstation deleted")
  return TrainStation.findByIdAndDelete(trainStation_Id)
    .then((trainStation) =>
      trainStation
        ? res.status(201).json({ message: "Train Station Deleted" })
        : res.status(404).json({
            message: "Train Station NOT found",
          })
    )
    .catch((error) => res.status(500).json({ error }));
};

export default {
  createATrainStation,
  readATrainStation,
  readAllTrainStations,
  updateATrainStation,
  deleteATrainStation,
  readTrainsFrom,
};
