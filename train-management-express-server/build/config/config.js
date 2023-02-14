"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.config = void 0;
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
const MONGO_URL = `mongodb://localhost:27017/Train-Management-System`;
const SERVER_HOST = process.env.SERVER_HOST || '127.0.0.1';
const SERVER_PORT = process.env.SERVER_PORT || 3899;
exports.config = {
    mongo: { url: MONGO_URL },
    server: { hostname: SERVER_HOST, port: SERVER_PORT }
};
