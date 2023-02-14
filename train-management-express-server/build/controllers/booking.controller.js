"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importDefault(require("mongoose"));
const booking_model_1 = __importDefault(require("../models/booking.model"));
const logger_1 = require("../logger");
const readABooking = (req, res, next) => {
    const booking_Id = req.params.bookingId;
    logger_1.logger.info("bookings read");
    return booking_model_1.default
        .findById(booking_Id)
        .then((booking) => booking
        ? res.status(200).json({ booking })
        : res.status(404).json({
            message: "Booking NOT found",
        }))
        .catch((error) => res.status(500).json({ error }));
};
const readABookingName = (req, res, next) => {
    const bookingName = req.params.bookingName;
    logger_1.logger.info("a booking read");
    return booking_model_1.default
        .find({ "personal_information.first_name": bookingName })
        .then((booking) => booking
        ? res.status(200).json({ booking })
        : res.status(404).json({
            message: "Booking NOT found",
        }))
        .catch((error) => res.status(500).json({ error }));
};
const readAllBookings = (req, res, next) => {
    logger_1.logger.info("all bookings Read");
    return booking_model_1.default
        .find()
        .then((booking) => res.status(200).json({ booking }))
        .catch((error) => res.status(500).json({ error }));
};
const createABooking = (req, res, next) => {
    const { personal_information, train } = req.body;
    const booking = new booking_model_1.default({
        _id: new mongoose_1.default.Types.ObjectId(),
        personal_information,
        train,
    });
    logger_1.logger.info("booking created");
    return booking
        .save()
        .then((bookings) => res.status(201).json({ bookings }))
        .catch((error) => res.status(500).json({ error }));
};
const updateABooking = (req, res, next) => {
    const bookingName = req.params.bookingName;
    logger_1.logger.info("booking updated");
    return booking_model_1.default
        .findOneAndUpdate({ "personal_information.first_name": bookingName }, req.body)
        .then((booking) => {
        if (booking)
            return booking
                .save()
                .then((booking) => res.status(201).json({ booking }))
                .catch((error) => res.status(500).json({ error }));
    })
        .catch((error) => res.status(500).json({ error }));
};
const deleteABooking = (req, res, next) => {
    const bookingName = req.params.bookingName;
    logger_1.logger.info("booking deleted");
    return booking_model_1.default
        .find({ "personal_information.first_name": bookingName })
        .deleteOne()
        .then((booking) => booking
        ? res.status(201).json({ message: "Booking Deleted" })
        : res.status(404).json({
            message: "Booking NOT found",
        }))
        .catch((error) => res.status(500).json({ error }));
};
exports.default = {
    readABooking,
    readABookingName,
    readAllBookings,
    createABooking,
    updateABooking,
    deleteABooking,
};
