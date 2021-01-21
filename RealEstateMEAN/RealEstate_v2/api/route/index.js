const router=require("express").Router();
const apartmentController=require("../controller/apartment-controller.js");
const addressController=require("../controller/address-controller.js");
const imageController=require("../controller/image-controller.js");

router.route("/apartments")
      .get(apartmentController.getApartments)
      .post(apartmentController.addAnApartment);

router.route("/apartments/:apartmentId")
      .get(apartmentController.getAnApartment)
      .put(apartmentController.updateAnApartment)
      .delete(apartmentController.deleteAnApartment);

router.route("/apartments/:apartmentId/address")
      .get(addressController.getAnAddressOfAnApartment)
      .put(addressController.updateAnAddressOfAnApartment)
      .post(addressController.addAnAddressOfAnApartment)
      .delete(addressController.deleteAnAddressOfAnApartment);

      //image
router.route("/apartments/:apartmentId/images")
      .get(imageController.getImages)
      .post(imageController.addAnImage);

router.route("/apartments/:apartmentId/images/:imageId")
      .get(imageController.getAnImage)
      .put(imageController.updateAnImage)
      .delete(imageController.deleteAnImage);

module.exports=router;
