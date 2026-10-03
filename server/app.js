import express from "express";
import cors from "cors";
import helmet from "helmet";
import cookieParser from "cookie-parser";
import { routeInspector } from "./src/middlewares/routeInspector.middlewares.js";
import { errorHandler } from "./src/middlewares/errorHandler.middlewares.js";
import { userRouter } from "./src/modules/auth/routes/userRouter.routes.js";
import { dataRouter } from "./src/modules/data/routes/dataRouter.routes.js";

export const app = express();

app.use(helmet());
app.use(
  cors({
    methods: ["GET", "POST", "PATCH", "DELETE"],
    origin: "https://janus-vault.onrender.com",
    allowedHeaders: ["Content-type", "Authorization"],
    credentials: true,
  }),
);
app.use(express.json({ limit: "16kb" }));
app.use(express.urlencoded({ extended: true }));
app.use(express.static("public"));
app.use(cookieParser());
app.use(routeInspector);

app.use("/api/user", userRouter);
app.use("/api/data", dataRouter);

app.use(errorHandler);
