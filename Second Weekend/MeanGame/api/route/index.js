const router=require("express").Router();
const gameController=require("../controller/game-controller.js");
const publisherController=require("../controller/publisher-controller.js");
const reviewController=require("../controller/review-controller.js");
const userController=require("../controller/user-controller.js");

router.route("/games")
      .get(gameController.getGames)
      .post(userController.authenticate,gameController.addAGame);

router.route("/games/:gameId")
      .get(gameController.getAGame)
      .put(gameController.updateAGame)
      .delete(gameController.deleteAGame);

router.route("/games/:gameId/publishers")
      .get(publisherController.getAPublisherOfAGame)
      .put(publisherController.updateAPublisherOfAGame)
      .post(publisherController.addAPublisherOfAGame)
      .delete(publisherController.deleteAPublisherOfAGame);

      //review
router.route("/games/:gameId/reviews")
      .get(reviewController.getReviews)
      .post(reviewController.addAReview);

router.route("/games/:gameId/reviews/:reviewId")
      .get(reviewController.getAReview)
      .put(reviewController.updateAReview)
      .delete(reviewController.deleteAReview);


router.route("/users/register")
      .post(userController.register);

module.exports=router;
