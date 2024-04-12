"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const cors_1 = __importDefault(require("cors"));
const dotenv_1 = __importDefault(require("dotenv"));
const routes_1 = __importDefault(require("./routes"));
dotenv_1.default.config();
const app = (0, express_1.default)();
const port = 3000;
var corsOption = {
    origin: process.env.BASE_URL,
};
app.use((0, cors_1.default)(corsOption));
app.use(express_1.default.json({ limit: "20mb" }));
app.use("/api", routes_1.default);
app.get("/", (req, res) => {
    return res.send("Server running");
});
app.listen(port, () => {
    console.log("Server is listening on " + port);
});
