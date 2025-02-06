import express from "express";

const deviationsRoute = express.Router();

deviationsRoute.get("/", (req, res) => {
  res.render("pages/deviations");
});

export default deviationsRoute;
