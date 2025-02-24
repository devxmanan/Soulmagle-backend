import express from 'express'
import dotenv from "dotenv"
import cookieParser from 'cookie-parser'
import cors from 'cors'
import mongoose from "mongoose"
import { ErrorMiddleware } from "./src/utils/error.js"
import authRouter from './src/routes/auth.routes.js'
import { createServer } from 'http'
import { Server } from 'socket.io'
import { User } from './src/models/user.model.js'
import { UserManager } from "./src/managers/UserManger.js";


dotenv.config({ path: "./.env" });

const app = express()
const port = process.env.PORT || 8080

app.use(cors({
    origin: process.env.CORS_ORIGIN,
    credentials: true
}))
app.use(express.json({ limit: "16kb" }))
app.use(express.urlencoded({ extended: true, limit: "16kb" }))
app.use(express.static('public'))
app.use(cookieParser())

//routes
app.get("/", (req, res) => {
    res.send(`<!DOCTYPE html>
    <html lang="en">
    <head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>Tech Up Solution's Server</title>
        <style>
            body {
                font-family: Arial, sans-serif;
                background-color: #f4f4f9;
                display: flex;
                justify-content: center;
                align-items: center;
                height: 100vh;
                margin: 0;
            }
            .container {
                text-align: center;
                background: #fff;
                padding: 20px;
                box-shadow: 0 0 10px rgba(0,0,0,0.1);
                border-radius: 10px;
            }
            h1 {
                color: #333;
            }
            p {
                color: #666;
            }
        </style>
    </head>
    <body>
        <div class="container">
            <h1>This is Soulmegle's Server</h1>
        </div>
    </body>
    </html>`);
});

app.use("/api/v1/auth", authRouter);

app.all("*", (req, res, next) => {
    const err = new Error(`Route ${req.originalUrl} not found`);
    err.statusCode = 404;
    next(err);
});
app.use(ErrorMiddleware);

const connectDB = async () => {
    try {
        await mongoose.connect(String(process.env.DATABASE_URL));
        console.log('Connected to MongoDB.');
    } catch (err) {
        console.log(err)
    }
}

const server = createServer(app);
const io = new Server(server, {
    cors: {
        origin: process.env.CORS_ORIGIN,
        methods: ["GET", "POST"]
    }
});


const userManager = new UserManager();
setInterval(() => {
    console.log("users: ", userManager.users.length);
    console.log("queue: ", userManager.queue.length);
}, 4000)

io.on("connection", async (socket) => {
    const userId = socket.handshake.query.userId;
    userManager.addUser(userId, socket);
    console.log("User connected")
    socket.on("disconnect", () => {
        userManager.removeUser(socket.id);
        console.log("User disconnected");
    });
})

connectDB().then(() => {
    server.listen(port, () => {
        console.log(`Server listening at: http://localhost:${port}`);
    });
});
