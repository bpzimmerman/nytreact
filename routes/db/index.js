const router = require("express").Router();
const saveRoutes = require("./saves");
const commentRoutes = require("./comments");

// Article routes
router.use("/saves", saveRoutes);

// Comment routes
router.use("/comments", commentRoutes);

module.exports = router;