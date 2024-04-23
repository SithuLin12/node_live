const express = require("express");
const socket = require("socket.io");
const io = require('socket.io')(server, {
  cors: {
      origin: ['https://group.livechatmm.com',],
  }
});

/**----app setup---- */
const app = express();
app.use(express.static('public'));

/**----server setup---- */
const server = app.listen(4000, () => {
  console.log("Project is running on localhost:4000");
});

/**----route setup---- */
app.get("/", (req, res) => {
  res.sendFile(__dirname + "/public/index.html");
});

/**----socket setup---- */

io.on("connection", (socket) => {
  socket.on("chat", (data) => {
    io.sockets.emit("chat", data);
  });
  socket.on("typing", (name) => {
    socket.broadcast.emit("typing", name);
  });
});