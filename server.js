import express from "express";
import depositRoutes from "./routes/deposit.js";
import "./cron/checkPayments.js";

const app = express();
app.use(express.json());

app.use("/api/deposit", depositRoutes);

app.get("/", (req, res) => {
  res.send("AppleStore backend is running 🚀");
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log("Server started on port", PORT);
});
