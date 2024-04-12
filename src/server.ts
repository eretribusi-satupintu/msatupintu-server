import express, { Request, Response } from "express";
import cors from "cors";
import dotenv from "dotenv";
import routes from "./routes";

dotenv.config();

const app = express();
const port: Number = 3000;

var corsOption = {
  origin: process.env.BASE_URL,
};

app.use(cors(corsOption));

app.use(express.json({ limit: "20mb" }));

app.use("/api", routes);

app.get("/", (req: Request, res: Response) => {
  return res.send("Server running");
});

app.listen(port, () => {
  console.log("Server is listening on " + port);
});
