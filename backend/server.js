const express = require("express");
const cors = require("cors");

const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// ✅ Updated API (dynamic score)
app.get("/api/compatibility/:candidateId/:jobId", (req, res) => {
  const score = Math.floor(Math.random() * 40) + 60; // 60–100 range
  res.json({ score });
});

// Start server
app.listen(3001, () => {
  console.log("Server running on port 3001");
});