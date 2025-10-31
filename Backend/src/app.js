const express = require("express");
const cookieParser = require("cookie-parser");
const cors = require("cors"); // <-- 1. Import cors
const path = require("path");

/* Routes */
const authRoutes = require("./routes/auth.routes");
const chatRoutes = require("./routes/chat.routes");

const app = express();

/* --- CORS Configuration --- */
// 2. Define your frontend origin
const corsOptions = {
  origin: "http://localhost:5173",
  credentials: true, // This allows cookies to be sent
};

// 3. Use cors middleware *before* your routes
app.use(cors(corsOptions));
/* -------------------------- */

/* using middlewares */
app.use(express.json());
app.use(cookieParser()); // You need credentials:true in cors for this to work
app.use(express.static(path.join(__dirname, "public")));

/* Using Routes */
app.use("/api/auth", authRoutes);
app.use("/api/chat", chatRoutes);

app.get("*name", (req, res) => {
    res.sendFile(path.join(__dirname, "public", "index.html"));
})

module.exports = app;