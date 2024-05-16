import express from "express";
import bodyParser from "body-parser";
import mountRoutes from "./routes/index";

const app = express();

// Middleware
app.use(bodyParser.json());

// Routes
mountRoutes(app);

export default app;
