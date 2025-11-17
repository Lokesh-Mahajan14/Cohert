const express = require("express");
const http = require("http");
const socketIo = require("socket.io");

const app = express();
const server = http.createServer(app);
const io = socketIo(server);

// Set a strict Content Security Policy header
app.use((req, res, next) => {
  res.setHeader(
    "Content-Security-Policy",
    "default-src 'self'; connect-src 'self' ws://localhost:3000 http://localhost:3000;"
  );
  next();
});

// Serve static files from the public folder
app.use(express.static("public"));

// Optional: Handle Chrome DevTools request to silence 404/CSP warning
app.get('/.well-known/appspecific/com.chrome.devtools.json', (req, res) => {
  res.status(204).end(); // No content
});

const users = new Set();

io.on("connection", (socket) => {
  console.log("A user is now connected");

  socket.on("join", (userName) => {
    users.add(userName);          // Store the actual username
    socket.userName = userName;

    // Notify all clients that a user joined
    io.emit("userJoined", userName);

    // Send the updated user list to all clients
    io.emit("userList", Array.from(users));
  });

  // Optional: Handle user disconnect
  socket.on("disconnect", () => {
    if (socket.userName) {
      users.delete(socket.userName);
      io.emit("userList", Array.from(users));
      io.emit("userLeft", socket.userName);
    }
    console.log("A user disconnected");
  });
});

// Start the server
const PORT = 3000;
server.listen(PORT, () => {
  console.log(`Server is now running on http://localhost:${PORT}`);
});
