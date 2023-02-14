import Joi, { ObjectSchema } from 'joi';
import { NextFunction, Request, Response } from 'express';
import { IBookingModel } from '../models/booking.model';

export const ValidateBooking = ( schema: ObjectSchema) => {
    return async (req: Request,  res: Response, next: NextFunction) => {
        try {
            await schema.validateAsync(req.body);

            next();
        }
        catch (error) {
            console.log( error );
            return res.status(422).json({ error });
        }
    };
};

export const BookingSchema = {
    booking: {
        create: Joi.object<IBookingModel>({
            personal_information: {
                first_name: Joi.string().required(),
                last_name: Joi.string().required(),
                email: Joi.string().required(),
                phone_number: Joi.string().required()
            },
            train:
                {
                    price: Joi.number().required(),
                    station_from: Joi.string().required(),
                    time_from: Joi.string().required(), 
                    station_to: Joi.string().required(),          
                    time_to: Joi.string().required()
                }                
        }),
        update: Joi.object<IBookingModel>({
            personal_information: {
                first_name: Joi.string().required(),
                last_name: Joi.string().required(),
                email: Joi.string().required(),
                phone_number: Joi.string().required()
            },
            train:
            {
                price: Joi.number().required(),
                station_from: Joi.string().required(),
                time_from: Joi.string().required(), 
                station_to: Joi.string().required(),          
                time_to: Joi.string().required()
            }     
        })
    }
};
