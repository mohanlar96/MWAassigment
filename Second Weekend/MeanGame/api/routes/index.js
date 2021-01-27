var express=require("express");
var router = express.Router();
const controllerGames=require("../controllers/games.controller.js");
const controlleruser=require("../controllers/user-controller.js");

router.route("/games").get(controllerGames.gamesGetAll)
                      .post(controllerGames.gamesAddOne);

router.route("/games/:gameid").get(controllerGames.gamesGetOne)
                              .put(controllerGames.gamesUpdateOne)
                              .delete(controllerGames.gamesDeleteOne);

// router.route("/games/new").post(controllerGames.gamesAddOne);

router.route("/user/register").post(controlleruser.register);

router.route("/user/login").post(controlleruser.login);

module.exports=router;

