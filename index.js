const express = require("express");
const socketio = require("socket.io");
const http = require("http");
const path = require("path");
const cors = require("cors");
const bodyParser = require("body-parser");

require("./config/mongoConn");

// Config Based On Env
const mode = process.env.NODE_ENV;
const config =
  mode == "prod" ? require("./env/production") : require("./env/development");
const PORT = process.env.PORT || config.port;

// Models
const Messages = require("./model/messages");

// Internal Routes
const {
  addUser,
  removeUser,
  getUsers,
  getUsersInRoom,
  isUserOnline,
} = require("./controllers/userAuth");

// External Routes
const userAuth = require("./routes/userAuth");
const users = require("./routes/users");
const messages = require("./routes/messages");

const app = express();
app.use(cors());
app.use(bodyParser.urlencoded({ limit: "50mb", extended: true }));
app.use(bodyParser.json());

const server = http.createServer(app);
const io = socketio(server);

app.use("/", userAuth);
app.use("/users", users);
app.use("/messages", messages);

io.on("connection", (socket) => {
  // BlueTick Logic
  // Whenever User Open His/Her Chat Window Mark All Messages As READ In DB Which Are Sent To Him In That Specifice Room
  socket.on("join", async ({ senderId, name, room }, callback) => {
    let secondUser = room.split("_").map((n) => Number(n));
    senderId = Number(senderId);

    secondUser = secondUser[0] === senderId ? secondUser[1] : secondUser[0];

    const { error, user } = await addUser({
      id: socket.id,
      name,
      room,
      senderId,
    });

    if (error) return callback(error);

    try {
      await Messages.updateMany(
        {
          conversationId: room,
          sentBy: secondUser,
          messageStatus: "DELIVERED",
        },
        {
          $set: { messageStatus: "READ" },
        }
      );
    } catch (error) {
      return callback("Something went wrong");
    }

    socket.join(user.room);

    io.to(user.room).emit("roomData", {
      room: user.room,
      users: getUsersInRoom(user.room),
    });

    callback();
  });

  // Send Message Logic
  // If The User To Which We Are Sending Message Is Not Online Mark That Msg As SENT
  // If The User To Which We Are Sending Message Is Online Mark That Msg As DELIVERED
  // If The User To Which We Are Sending Message Is Online In Same Room Mark That Msg As READ
  socket.on("sendMessage", async (message, callback) => {
    const { error, user } = getUsers(socket.id);

    if (error) return callback("User Not Found");

    let secondUser = user.room.split("_").map((n) => Number(n));
    let senderId = Number(user.senderId);

    secondUser = secondUser[0] === senderId ? secondUser[1] : secondUser[0];
    const activeUsers = getUsersInRoom(user.room);
    const userStatus = isUserOnline(secondUser);

    let messageStatus = "SENT";

    if (userStatus !== -1) messageStatus = "DELIVERED";

    if (activeUsers.length === 2) messageStatus = "READ";

    let addMessage = {
      conversationId: user.room,
      messageType: "TEXT",
      message: message,
      messageStatus,
      sentBy: user.senderId,
      sentByName: user.name,
    };

    try {
      addMessage = new Messages(addMessage);
      await addMessage.save();
    } catch (error) {
      return callback("Message Not Send");
    }

    io.to(user.room).emit("message", addMessage);

    io.to(user.room).emit("roomData", {
      room: user.name,
      users: getUsersInRoom(user.room),
    });

    callback();
  });

  socket.on("disconnect", () => {
    const user = removeUser(socket.id);
  });
});

if (process.env.NODE_ENV === "production") {
  app.use(express.static("client/build"));

  app.get("*", (req, res) => {
    res.sendFile(path.join(__dirname, "client", "build", "index.html"));
  });
}

server.listen(PORT, () =>
  console.log(
    "Express server started on PORT",
    PORT,
    "in",
    config.mode,
    "mode."
  )
);
