const router = require("express").Router();
const saveRoutes = require("./saves");

// Article routes
router.use("/saves", saveRoutes);

module.exports = router;