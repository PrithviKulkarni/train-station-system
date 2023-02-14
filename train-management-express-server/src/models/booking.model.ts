import mongoose, { Document, Schema } from "mongoose";

export interface IBooking {
  personal_information: {
    first_name: string;
    last_name: string;
    email: string;
    phone_number: string;
  };
    train: 
      {
          price: number;
          station_from: string;
          time_from: string;
          station_to: string;
          time_to: string;
      };
}

export interface IBookingModel extends IBooking, Document {}

const BookingSchema: Schema = new Schema(
    {
    personal_information: {
        first_name: { type: String, require: true },
        last_name: { type: String, require: true },
        email: { type: String, require: true },
        phone_number: { type: String, require: true },
      },
      train: 
        {
            price: { type: Number, require: true },
            station_from: { type: String, require: true },
            time_from: { type: String, require: true },
            station_to: { type: String, require: true },
            time_to: { type: String, require: true },
        },
    },
  {
    versionKey: false,
  }
);

export default mongoose.model<IBookingModel>("bookings", BookingSchema);
