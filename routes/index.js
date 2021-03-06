const path = require("path");
const router = require("express").Router();
const apiRoutes = require("./api");
const dbRoutes = require("./db");

// API Routes
router.use("/api", apiRoutes);

// Database Routes
router.use("/db", dbRoutes);

router.use(function(req, res) {
  res.sendFile(path.join(__dirname, "../client/build/index.html"));
});

module.exports = router;