const express = require("express");
const http = require("http");
const cors = require("cors");
const bodyParser = require("body-parser");
const dotenv = require("dotenv");
const homeRouter = require("./src/home/home.routes");
const createError = require("http-errors");
const homeModel = require("./src/home/home.models");

dotenv.config();

const app = express();
const server = http.createServer(app);
app.use(
  bodyParser.urlencoded({
    extended: false,
  })
);

app.use(bodyParser.json());
app.use(cors());
const io = require("socket.io")(server, {
  cors: {
    origin: "*",
    methods: ["GET", "POST"],
  },
});

io.on("connection", (socket) => {
  // console.log("client connect", socket.id);
  socket.emit("me", socket.id);
  // socket.emit("54314",socket.id)

  // socket.on("user", (data)=>{
  // 	console.log(data)
  // })
  socket.on("disconnect", async () => {
    try {
      const i = await homeModel.remove_Token({ socketID: socket.id });
      // console.log('hah', socket.id);
      // console.log('disconnect', i);
      if (i > 0) {
        socket.broadcast.emit("getUser", "Xóa" + Math.random());
      }
      socket.broadcast.emit("callEnded");
    } catch (error) {
      console.error("Error in disconnect:", error);
    }
  });

  socket.on("leaveCall", (data) => {
    // console.log(data)
    io.to(data.to).emit("leaveCall", Math.random);
    io.to(data.from).emit("leaveCall", Math.random);
  });
  socket.on("callUser", (data) => {
    // console.log('userToCall', data.userToCall)
    // console.log('data.from', data.from)

    io.to(data.userToCall).emit("callUser", {
      signal: data.signalData,
      from: data.from,
      name: data.from,
    });
  });

  socket.on("answerCall", (data) => {
    // console.log('người đến',data.to)

    io.to(data.to).emit("callAccepted", data.signal);
    // io.to(data.from).emit("callAccepted", data.signal)
  });
});

server.listen(5000, () => console.log("server is running on port 5000"));
app.set("etag", "strong");
app.set("socketio", io);
app.use("/api", homeRouter);
app.use((req, res, next) => {
  next(createError(404));
});

app.use((err, req, res) => {
  console.log(err.stack);
  res.status(err.status || 500).send(err.message);
});
