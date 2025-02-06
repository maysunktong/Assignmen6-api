import express from "express";
import * as path from "path";

const PORT = 3010;
const app = express();
const __dirname = path.resolve();

const departures = express.Router();
const deviations = express.Router();
const favorites = express.Router();

app.use(express.static(path.join(__dirname, "public")));

app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, "/index.html"));
});

departures.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, "pages/departures.html"));
});
deviations.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, "pages/deviations.html"));
});
favorites.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, "pages/favorites.html"));
});

app.use("/departures", departures);
app.use("/deviations", deviations);
app.use("/favorites", favorites);

app.listen(PORT, () =>
  console.log(`✅ Listening on ${PORT} ➡ http://localhost:${PORT}`)
);
