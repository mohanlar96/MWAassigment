const router=require("express").Router();
const gameController=require("../controller/gameController");

router.route("/games")
      .get(gameController.getGames);
    //   .post(gameController.addGame);

// router.route("/games/:gameId")
//       .get(gameController.getAGame)
//       .put(gameController.updateGame)
//       .delete(gameController.deleteAGame);





module.exports=router;
