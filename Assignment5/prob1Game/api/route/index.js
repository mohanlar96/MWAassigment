const router=require("express").Router();
const gameController=require("../controller/game-controller.js");

router.route("/games")
      .get(gameController.getGames)
      .post(gameController.addAGame);

router.route("/games/:gameId")
      .get(gameController.getAGame)
      .put(gameController.updateAGame)
      .delete(gameController.deleteAGame);

module.exports=router;
