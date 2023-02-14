"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
const express_1 = __importDefault(require("express"));
const booking_controller_1 = __importDefault(require("../controllers/booking.controller"));
const validateBooking_1 = require("../middleware/validateBooking");
const router = express_1.default.Router();
router.get("/get/:bookingId", booking_controller_1.default.readABooking);
router.get("/getByName/:bookingName", booking_controller_1.default.readABookingName);
router.get("/get/", booking_controller_1.default.readAllBookings);
router.delete("/deleteABooking/:bookingName", booking_controller_1.default.deleteABooking);
router.post("/createABooking", (0, validateBooking_1.ValidateBooking)(validateBooking_1.BookingSchema.booking.create), booking_controller_1.default.createABooking);
router.patch("/updateABooking/:bookingName", (0, validateBooking_1.ValidateBooking)(validateBooking_1.BookingSchema.booking.update), booking_controller_1.default.updateABooking);
module.exports = router;
