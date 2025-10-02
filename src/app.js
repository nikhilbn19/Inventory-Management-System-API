require("express-async-errors");
const express = require("express");
const morgan = require("morgan");
const cors = require("cors");
const productRoutes = require("./routes/productRoutes");
const { errorHandler } = require("./middlewares/errorHandler");

const app = express();
app.use(morgan("dev"));
app.use(cors());
app.use(express.json());

app.use("/api/products", productRoutes);
app.get("/health", (req, res) => res.json({ ok: true }));

app.use(errorHandler);

module.exports = app;
