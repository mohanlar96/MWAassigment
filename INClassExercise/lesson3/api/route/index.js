const router=require("express").Router();
const gameController=require("../controller/gameController");
const publisherController=require("../controller/publisherController");


router.route("/games").get(gameController.getGames);
router.route("/games/:gameId").get(gameController.getAGame);
router.route("/games/:gameId/publishers").get(publisherController.publisherGetOne);



module.exports=router;
