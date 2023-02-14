import { NextFunction, Request, Response } from "express";
import mongoose from "mongoose";
import bookings from "../models/booking.model";
import { logger } from "../logger";

const readABooking = (req: Request, res: Response, next: NextFunction) => {
  const booking_Id = req.params.bookingId;

  logger.info("bookings read");
  return bookings
    .findById(booking_Id)
    .then((booking) =>
      booking
        ? res.status(200).json({ booking })
        : res.status(404).json({
            message: "Booking NOT found",
          })
    )
    .catch((error) => res.status(500).json({ error }));
  
};

const readABookingName = (req: Request, res: Response, next: NextFunction) => {
  const bookingName = req.params.bookingName;

  logger.info("a booking read");
  return bookings
    .find({ "personal_information.first_name": bookingName })
    .then((booking) =>
      booking
        ? res.status(200).json({ booking })
        : res.status(404).json({
            message: "Booking NOT found",
          })
    )
    .catch((error) => res.status(500).json({ error }));
};

const readAllBookings = (req: Request, res: Response, next: NextFunction) => {
  logger.info("all bookings Read");
  return bookings
    .find()
    .then((booking) => res.status(200).json({ booking }))
    .catch((error) => res.status(500).json({ error }));
};

const createABooking = (req: Request, res: Response, next: NextFunction) => {
  const { personal_information, train } = req.body;

  const booking = new bookings({
    _id: new mongoose.Types.ObjectId(),
    personal_information,
    train,
  });

  logger.info("booking created");
  return booking
    .save()
    .then((bookings) => res.status(201).json({ bookings }))
    .catch((error) => res.status(500).json({ error }));
};

const updateABooking = (req: Request, res: Response, next: NextFunction) => {
  const bookingName = req.params.bookingName;

  logger.info("booking updated");
  return bookings
    .findOneAndUpdate(
      { "personal_information.first_name": bookingName },
      req.body
    )
    .then((booking) => {
      if (booking)
        return booking
          .save()
          .then((booking) => res.status(201).json({ booking }))
          .catch((error) => res.status(500).json({ error }));
    })
    .catch((error) => res.status(500).json({ error }));
};

const deleteABooking = (req: Request, res: Response, next: NextFunction) => {
  const bookingName = req.params.bookingName;

  logger.info("booking deleted");
  return bookings
    .find({ "personal_information.first_name": bookingName })
    .deleteOne()
    .then((booking) =>
      booking
        ? res.status(201).json({ message: "Booking Deleted" })
        : res.status(404).json({
            message: "Booking NOT found",
          })
    )
    .catch((error) => res.status(500).json({ error }));
};

export default {
  readABooking,
  readABookingName,
  readAllBookings,
  createABooking,
  updateABooking,
  deleteABooking,
};
