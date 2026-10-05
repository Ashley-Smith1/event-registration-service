// import the express application and type definition
import express, { Express } from "express";
import morgan from "morgan";
import eventRoutes from "./api/v1/routes/eventRoutes";

// initialize the express application
const app: Express = express();
app.use(express.json());
app.use(morgan("dev"));
app.use("/api/v1", eventRoutes);

// Interface for health check response
interface HealthCheckResponse {
    status: string;
    uptime: number;
    timestamp: string;
    version: string;
}

// Middleware for logging HTTP requests
app.use(morgan("combined"));

// respond to GET request at endpoint "/" with message
app.get("/", (req, res) => {
    res.send("Hello World");
});

/**
 * Health check endpoint that returns server status information
 * @returns JSON response with server health metrics
 */
app.get("/api/v1/health", (req, res) => {
    const healthData: HealthCheckResponse = {
    "status": "OK",
    "uptime": 45.123,
    "timestamp": "2025-01-15T10:30:00.000Z",
    "version": "1.0.0"
};
    res.json(healthData);
});

export default app;