const router=require("express").Router();
const gameController=require("../controller/gameController");



router.route("/games").get(gameController.getGames);
router.route("/games/:gameId").get(gameController.getAGame);



module.exports=router;
