import express from "express";
import * as path from "path";
import departuresRoute from "./routes/departures.js";
import deviationsRoute from "./routes/deviations.js";

const PORT = 3010;
const app = express();
const __dirname = path.resolve();

app.set("view engine", "ejs");
app.use(express.static(path.join(__dirname, "public")));

app.get("/", (req, res) => {
  res.render("pages/index");
});

app.use("/departures", departuresRoute);
app.use("/deviations", deviationsRoute);

app.listen(PORT, () =>
  console.log(`✅ Listening on ${PORT} ➡ http://localhost:${PORT}`)
);
