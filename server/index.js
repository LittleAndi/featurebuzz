const express = require("express");
const app = express();
const PORT = 4000;

const cors = require("cors");
const http = require("http").Server(app);

app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(cors());

const socketIO = require("socket.io")(http, {
  cors: {
    origin: "http://localhost:3000",
  },
});

const database = [];
const generateID = () => Math.random().toString(36).substring(2, 10);

socketIO.on("connection", (socket) => {
  console.log(`⚡: ${socket.id} user just connected!`);

  socket.on("login", (data) => {
    //👇🏻 data - contains the username and password
    const { username, password } = data;
    let result = database.filter(
      (user) => user.username === username && user.password === password
    );
    if (result.length !== 1) {
      return socket.emit("loginError", "Incorrect credentials");
    }
    socket.emit("loginSuccess", {
      message: "Login successfully",
      data: {
        _id: result[0].id,
        _email: result[0].email,
      },
    });
  });

  socket.on("register", (data) => {
    const { username, email, password } = data;
    console.log(username);
    let result = database.filter(
      (user) => user.email === email || user.username === username
    );
    if (result.length === 0) {
      database.push({
        id: generateID(),
        username,
        password,
        email,
        images: [],
      });
      return socket.emit("registerSuccess", "Account created successfully!");
    }
    socket.emit("registerError", "User already exists");
  });

  socket.on("createIdea", (data) => {
    const { id, email, pitch, description } = data;
    let result = database.filter((user) => user.id === id);
    const newIdea = {
      id: generateID(),
      pitch: pitch,
      description: description,
      vote_count: 0,
      votedUsers: [],
      _ref: email,
    };
    result[0]?.ideas.unshift(newIdea);
    socket.emit("createIdeaMessage", "Idea created successfully!");
  });

  socket.on("disconnect", () => {
    socket.disconnect();
    console.log("🔥: A user disconnected");
  });
});

app.get("/api", (req, res) => {
  res.json({
    message: "Hello world",
  });
});

http.listen(PORT, () => {
  console.log(`Server listening on ${PORT}`);
});
