import express from "express";
import cors from "cors";
import { connect } from "./database";
import { ApolloServer } from "apollo-server-express";
import typeDefs from "./schemas/index.js";
import resolvers from "./resolvers/index.js";
import isAuth from "./middleware/is-auth";
import path from "path";
import fs from "fs";
import archiver from "archiver";

const app = express();
app.use(isAuth);
app.use(cors());
connect();

const { PORT, API_URL } = process.env;

const SERVER = new ApolloServer({
  typeDefs,
  resolvers,

  context: ({ req }) => {
    const UserAuth = req.isAuth;

    return { UserAuth };
  },
  introspection: true,
  playground: true,
  playground: {
    endpoint: `${API_URL}/graphql`,
    settings: {
      "editor.theme": "dark",
    },
  },
});

SERVER.applyMiddleware({
  app,
});

app.get("/download/CSVtemplate", function (req, res) {
  res.download(path.join(__dirname, "uploads", "modelo.csv"));
});

app.get("/download/teachers/:classId/:name", function (req, res) {
  const { name, classId } = req.params;
  res.download(path.join(__dirname, "uploads", "teachers", classId, name));
});

app.get("/download/students/:classId/:name", function (req, res) {
  const { classId, name } = req.params;
  res.download(path.join(__dirname, "uploads", "students", classId, name));
});

app.get("/download/:classId/", function (req, res) {
  const { classId } = req.params;
  const dirPath = path.join(__dirname, "uploads", "students", classId);
  const filePath = path.join(
    __dirname,
    "uploads",
    "students",
    `${classId}.zip`
  );

  if (fs.existsSync(dirPath)) {
    const output = fs.createWriteStream(filePath);
    const archive = archiver("zip");

    output.on("close", function () {
      res.download(filePath);
    });

    output.on("end", function () {
      console.log("Data has been drained");
    });

    archive.on("warning", function (err) {
      if (err.code === "ENOENT") {
        console.log(err);
      } else {
        throw err;
      }
    });

    archive.on("error", function (err) {
      throw err;
    });

    archive.pipe(output);
    archive.directory(dirPath, false);
    archive.finalize();
  } else {
    return res.send(404);
  }
});

app.set("port", PORT);
app.listen(app.get("port"), () => {
  console.log(`Server on port ${PORT}`);
});
