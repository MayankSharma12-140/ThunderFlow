const express = require("express");
const cors = require("cors");
require("dotenv").config();
require("./config/db");

const apiRoutes = require("./routes/api");
const authRoutes = require("./routes/authRoutes");

const app = express();

app.use(cors());
app.use(express.json());

const indexRoutes = require("./routes");

app.use("/",indexRoutes);
app.use("/api", apiRoutes);
app.use("/api/auth", authRoutes);

const PORT = process.env.PORT || 5000;

app.listen(PORT, ()=>{
    console.log(`Server running on http://localhost:${PORT}`);
});