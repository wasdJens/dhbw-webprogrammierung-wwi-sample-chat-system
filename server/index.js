import express from "express";
import path from "node:path";
import { createServer } from "node:http";
import { fileURLToPath } from "node:url";
import { Server } from "socket.io";
import cors from "cors";
import helmet from "helmet";
import rateLimit from "express-rate-limit";

// Create express and websocket server
const app = express();
const server = createServer(app);
const io = new Server(server, { cors: { origin: "*" } });
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Small security stuff
const limiter = rateLimit({
  windowMs: 1 * 60 * 1000, // 1 minute
  max: 20,
});
app.use(limiter);
app.use(helmet());
app.use(express.static(path.join(__dirname, "./public")));
app.use(cors());

// Serve frontend as static files
app.get("/chat", (req, res) => {
  res.sendFile(path.join(__dirname, "./public", "index.html"));
});

// Chat informations
let connectedUsers = 0;
const listOfChatters = [];
const chatHistory = [];

// On websocket connection
io.on("connection", (socket) => {
  // Track connected users count
  connectedUsers++;

  if (connectedUsers >= Number.MAX_SAFE_INTEGER) {
    connectedUsers = 0;
  }

  io.emit("connected-users", connectedUsers);

  // On a new chat message send the message to all connected clients
  socket.on("chat", (chat) => {
    chatHistory.push(chat);
    if (chatHistory.length > 1000) {
      chatHistory = [];
    }
    io.emit("chat", {
      message: chat.message,
      id: chat.id,
      time: chat.time,
      identifier:
        listOfChatters.find((chatter) => chatter.id === chat.id).identifier ??
        "Unknown",
    });
  });

  // A new chatter connected keep track of its information
  socket.on("user-information", (user) => {
    listOfChatters.push(user);

    if (listOfChatters.length > 1000) {
      listOfChatters = [];
    }
  });

  // Client disconnected
  socket.on("disconnect", () => {
    connectedUsers--;
    if (connectedUsers < 0) {
      connectedUsers = 0;
    }
    io.emit("connected-users", connectedUsers);
  });
});

server.listen(3000, () => {
  console.log("server running at Port 3000");
});
