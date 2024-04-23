const express = require("express");
const socket = require("socket.io");

/**----app setup---- */
const app = express();
app.use(express.static('public'));

/**----server setup---- */
const server = app.listen(4000,'0.0.0.0',  () => {
  console.log("Project is running on localhost:4000");
});

/**----route setup---- */
app.get("/", (req, res) => {
  res.sendFile(__dirname + "/public/index.html");
});

/**----socket setup---- */
const io = require('socket.io')(server);
io.on("connection", (socket) => {
  socket.on("chat", (data) => {
    io.sockets.emit("chat", data);
  });
  socket.on("typing", (name) => {
    socket.broadcast.emit("typing", name);
  });
});