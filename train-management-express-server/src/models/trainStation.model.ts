import mongoose, { Document, Schema } from "mongoose";

export interface ITrainStation {
  location: {
    city: string;
    postcode: string;
  };
  trains: [
    {
        name: string;
        seats_available: number;
        price: number
        station_from: string;
        time_from: [Date];
        station_to: string;
        time_to: [Date];
    }
  ];
}

export interface ITrainStationModel extends ITrainStation, Document {}

const TrainStationSchema: Schema = new Schema(
  {
    location: {
      city: { type: String, require: true },
      postcode: { type: String, require: true },
    },
    trains: [
      {
          name: { type: String, require: true },
          seats_available: { type: Number, require: true },
          price: { type: Number, require: true},
          station_from: { type: String, require: true },
          time_from: { type: Array<Date>, require: true },
          station_to: { type: String, require: true },
          time_to: { type: Array<Date>, require: true },
      },
    ],
  },
  {
    versionKey: false,
  }
);

export default mongoose.model<ITrainStationModel>(
  "TrainStation",
  TrainStationSchema
);
