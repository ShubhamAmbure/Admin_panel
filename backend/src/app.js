const express = require("express");
const cors = require("cors");

const authRoutes = require("./routes/authRoutes");
const categoryRoutes = require("./routes/categoryRoutes");
const subcategoryRoutes = require("./routes/subcategoryRoutes");
const productRoutes = require("./routes/productRoutes");
const authMiddleware = require("./middleware/authMiddleware");

const app = express();

app.use(cors());
app.use(express.json());

app.use("/api/auth", authRoutes);
app.use("/api/categories", categoryRoutes);
app.use("/api/subcategories", subcategoryRoutes);
app.use("/api/products", productRoutes);

app.get("/api/test", authMiddleware, (req, res) => {
  res.json({ message: "Authorized" });
});

app.get("/", (req, res) => {
  res.json({ message: "Backend running" });
});

module.exports = app;
