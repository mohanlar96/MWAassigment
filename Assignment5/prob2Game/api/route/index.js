const router=require("express").Router();
const gameController=require("../controller/game-controller.js");
const publisherController=require("../controller/publisher-controller.js");

router.route("/games")
      .get(gameController.getGames)
      .post(gameController.addAGame);

router.route("/games/:gameId")
      .get(gameController.getAGame)
      .put(gameController.updateAGame)
      .delete(gameController.deleteAGame);

router.route("/games/:publisherId/publishers")
      .get(publisherController.getAPublisherOfAGame)
      .put(publisherController.updateAPublisherOfAGame)
      .post(publisherController.addAPublisherOfAGame)
      .delete(publisherController.deleteAPublisherOfAGame);

module.exports=router;
