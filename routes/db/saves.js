const router = require("express").Router();
const savesController = require("../../controllers/savesController");

// Matches with "/db/saves"
router.route("/")
  .post(savesController.saveArticle)
  .get(savesController.findAll)
  .delete(savesController.deleteArticle);

module.exports = router;