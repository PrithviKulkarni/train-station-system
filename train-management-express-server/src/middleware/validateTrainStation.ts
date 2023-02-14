import Joi, { ObjectSchema } from "joi";
import { NextFunction, Request, Response } from "express";
import { ITrainStation } from "../models/trainStation.model";

export const ValidateTrainStation = (schema: ObjectSchema) => {
  return async (req: Request, res: Response, next: NextFunction) => {
    try {
      await schema.validateAsync(req.body);

      next();
    } catch (error) {
      console.log(error);
      return res.status(422).json({ error });
    }
  };
};

export const TrainStationSchema = {
  trainStation: {
    create: Joi.object<ITrainStation>({
      location: {
        city: Joi.string().required(),
        postcode: Joi.string().required(),
      },
      trains: [
        {
            name: Joi.string().required(),
            price: Joi.number().required(),
            seats_available: Joi.number().required(),
            station_from: Joi.string().required(),
            station_to: Joi.string().required(),          
          },
      ],
    }),

    update: Joi.object<ITrainStation>({
      location: {
        city: Joi.string().required(),
        postcode: Joi.string().required(),
      },
      trains: [
        {
            name: Joi.string().required(),
            price: Joi.number().required(),
            seats_available: Joi.number().required(),
            station_from: Joi.string().required(),
            station_to: Joi.string().required(),          
          },
      ],
    }),
  },
};
