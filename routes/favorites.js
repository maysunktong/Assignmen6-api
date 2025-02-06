import express from "express";

const favoritesRoute = express.Router();

favoritesRoute.get("/", (req, res) => {
  res.render("pages/favorites", {
    title: "Favorites",
    subtitle: "",
  });
});

export default favoritesRoute;
