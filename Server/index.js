const express = require("express");
const http = require("http");
const { Server } = require("socket.io");
const cors = require("cors");
const port = 3001;


const app = express();
app.use(cors());
const server = http.createServer(app);
const io = new Server(server, {
  cors: {
    origin: "*",
  },
});

let content = "";
const users = new Map();

io.on("connection", (socket) => {
  console.log("User connected:", socket.id);

  socket.on("join", (username) => {
    socket.username = username;
    users.set(socket.id, username);
    socket.emit("load-document", content);
    io.emit("update-user-list", Array.from(users.values())); // Broadcast updated user list
  });

  socket.on("send-changes", ({ delta, user, index }) => {
    socket.broadcast.emit("receive-changes", { delta, user, index });
  });

  socket.on("save-document", (data) => {
    content = data; // Save document content to be used across users
  });

  socket.on("disconnect", () => {
    console.log(`${socket.username} disconnected`);
    users.delete(socket.id);
    io.emit("update-user-list", Array.from(users.values())); // Broadcast updated user list
  });
});

app.get("/", (req, res) => {
  res.send("Socket server is running 🚀");
});

server.listen(port, () => {
  console.log(`Server running on http://localhost:${port}`);
});