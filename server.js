const express = require("express");
const connectDB = require("./config/db");
const app = express();

// Connect to database
connectDB();

// Init Middleware (body-parser)
app.use(express.json());

// Define Routes
app.use("/api/users", require("./routes/api/users"));
app.use("/api/auth", require("./routes/api/auth"));

app.get("/", (req, res) => {
  res.send("Hello");
});

const PORT = process.env.PORT | 5000;
app.listen(PORT, () => console.log(`Server started on port ${PORT}`));
