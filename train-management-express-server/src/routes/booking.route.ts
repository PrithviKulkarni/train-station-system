import express from "express";
import controller from "../controllers/booking.controller";
import { BookingSchema, ValidateBooking } from "../middleware/validateBooking";

const router = express.Router();

router.get("/get/:bookingId", controller.readABooking);
router.get("/getByName/:bookingName", controller.readABookingName);
router.get("/get/", controller.readAllBookings);
router.delete("/deleteABooking/:bookingName", controller.deleteABooking);
router.post(
    "/createABooking",
    ValidateBooking(BookingSchema.booking.create),
    controller.createABooking
  );
  router.patch(
    "/updateABooking/:bookingName",
    ValidateBooking(BookingSchema.booking.update),
    controller.updateABooking
  );

export = router;
