const router = require("express").Router();
const savesController = require("../../controllers/savesController");

// Matches with "/db/comments"
router.route("/")
  .post(savesController.saveComment)
  .get(savesController.findComments)
  .delete(savesController.deleteAllComments);

// Matches with "/db/comments/:id"
router.route("/:id")
  .delete(savesController.deleteComment);

module.exports = router;