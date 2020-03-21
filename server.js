const express = require("express");
const helmet = require("helmet");
const morgan = require("morgan");
const cors = require("cors");

const server = express();

server.use(helmet());
server.use(morgan("dev"));
server.use(cors());
server.use(express.json());

const projectsRouter = require("./data/routers/projectsRouter");
const actionsRouter = require("./data/routers/actionsRouter");

server.get("/", (req, res) => {
  res.status(200).json({ message: "Sever is up and going" });
});

server.use("/api/actions", actionsRouter);
server.use("/api/projects", projectsRouter);


module.exports = server;