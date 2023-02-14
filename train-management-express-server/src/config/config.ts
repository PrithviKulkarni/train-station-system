import dotenv from 'dotenv';

dotenv.config();

const MONGO_URL = `mongodb://localhost:27017/Train-Management-System`;  

const SERVER_HOST =  process.env.SERVER_HOST || '127.0.0.1';
const SERVER_PORT = process.env.SERVER_PORT || 3899;

export const config = {
    mongo: { url: MONGO_URL},
    server: {hostname: SERVER_HOST, port: SERVER_PORT}
};