"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.TrainStationSchema = exports.ValidateTrainStation = void 0;
const joi_1 = __importDefault(require("joi"));
const ValidateTrainStation = (schema) => {
    return (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
        try {
            yield schema.validateAsync(req.body);
            next();
        }
        catch (error) {
            console.log(error);
            return res.status(422).json({ error });
        }
    });
};
exports.ValidateTrainStation = ValidateTrainStation;
exports.TrainStationSchema = {
    trainStation: {
        create: joi_1.default.object({
            location: {
                city: joi_1.default.string().required(),
                postcode: joi_1.default.string().required(),
            },
            trains: [
                {
                    name: joi_1.default.string().required(),
                    price: joi_1.default.number().required(),
                    seats_available: joi_1.default.number().required(),
                    station_from: joi_1.default.string().required(),
                    station_to: joi_1.default.string().required(),
                },
            ],
        }),
        update: joi_1.default.object({
            location: {
                city: joi_1.default.string().required(),
                postcode: joi_1.default.string().required(),
            },
            trains: [
                {
                    name: joi_1.default.string().required(),
                    price: joi_1.default.number().required(),
                    seats_available: joi_1.default.number().required(),
                    station_from: joi_1.default.string().required(),
                    station_to: joi_1.default.string().required(),
                },
            ],
        }),
    },
};
