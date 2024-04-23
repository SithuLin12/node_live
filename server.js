const express = require("express");
const socketio = require("socket.io");

/**----app setup---- */
const app = express();
app.use(function (req, res, next) {
  res.setHeader('Access-Control-Allow-Origin', '*');
	res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');
	res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,content-type');
	res.setHeader('Access-Control-Allow-Credentials', true);
	next();
});
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
const io = socketio(server, {
  cors: {
    origin: "*",
    methods: ["GET", "POST", "OPTIONS"]
  }
});
io.on("connection", (socket) => {
  socket.on("chat", (data) => {
    io.sockets.emit("chat", data);
  });
  socket.on("typing", (name) => {
    socket.broadcast.emit("typing", name);
  });
});