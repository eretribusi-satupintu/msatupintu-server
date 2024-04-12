"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
// config/mongo.ts
const mongoose_1 = __importDefault(require("mongoose"));
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
const mongoHost = process.env.MONGO_HOST;
const mongoPort = process.env.MONGO_PORT;
const mongoUsername = process.env.MONGO_USERNAME;
const mongoDatabase = process.env.MONGO_DATABASE;
const mongoPassword = process.env.MONGO_PASSWORD;
const mongoURI = `mongodb://${mongoUsername}:${mongoPassword}@${mongoHost}:${mongoPort}/${mongoDatabase}?authSource=admin`;
const dbConnection = mongoose_1.default.connection;
// Event listener for successful connection
dbConnection.on("connected", () => {
    console.log("Mongoose connected to MongoDB");
});
// Event listener for connection errors
dbConnection.on("error", (err) => {
    console.error("Mongoose connection error:", err);
});
// Event listener for disconnected state
dbConnection.on("disconnected", () => {
    console.log("Mongoose disconnected from MongoDB");
});
// Connect to MongoDB
mongoose_1.default
    .connect(mongoURI)
    .then(() => {
    console.log("Connected to MongoDB");
})
    .catch((err) => {
    console.error("Error connecting to MongoDB:", err);
});
exports.default = mongoURI;
