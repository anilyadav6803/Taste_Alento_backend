
import cors from "cors";
import express, { Request, Response } from "express";
import "dotenv/config";
import mongoose from "mongoose";
import MyUserRoute from "./routes/MyUserRoutes";


mongoose
  .connect(process.env.MONGODB_CONNECTION_STRING as string)
  .then(() => console.log("Connected to database!"));



const app = express();
app.use(cors());
app.use(express.json());

app.get("/health", (req: Request, res: Response) => {
  res.send({message : "Health okk :)"});
})

app.use("/api/my/user" , MyUserRoute);

app.get("/", (req: Request, res: Response) => {
  res.send("Hello World!");
});

app.listen(7000, () => {
  console.log("server started on localhost:7000");
});
