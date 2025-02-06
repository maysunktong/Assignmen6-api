import express from "express";
import favoritesRoute from "./favorites.js";

const departuresRoute = express.Router();

departuresRoute.get("/", (req, res) => {
  res.render("pages/departures", {
    title: "Trafikatt",
    subtitle: "Departures"
  });
});

departuresRoute.use("/favorites", favoritesRoute);

export default departuresRoute;
