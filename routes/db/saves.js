const router = require("express").Router();
const savesController = require("../../controllers/savesController");

// Matches with "/db/saves"
router.route("/")
  .post(savesController.saveArticle)
  .get(savesController.findAll)

module.exports = router;