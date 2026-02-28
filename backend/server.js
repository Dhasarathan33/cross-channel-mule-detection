const express = require("express");
const cors = require("cors");
const fraudRoutes = require("./routes/fraudRoutes");

const app = express();
app.use(cors());
app.use(express.json());

app.use("/api", fraudRoutes);

app.listen(5000, () => {
  console.log("Server running on port 5000");
});