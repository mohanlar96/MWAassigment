const ObjectId = require("mongodb").ObjectId;

const Apartment = require("mongoose").model("Apartment");

module.exports.getImages = function (req, res) {


    __res = (status, msg) => res.status(status).send({ message: msg });


    Apartment.findById(req.params.apartmentId).select("images").exec(function (err, img) {
        if (err) {
            __res(500, err);
            console.log("Error finding images");
        } else if (!img) {
            __res(404, "images not found!");
        } else {
            console.log("Found images", img);
            res.status(200).json(img);
        }
    });
}
module.exports.getAnImage = function (req, res) {

    __res = (status, msg) => res.status(status).send({ message: msg });

    Apartment.findById(req.params.apartmentId).select("images").exec(function (err, apartment) {
        const imgi = apartment.images.id(req.params.imageId);
        if (err) {
            __res(500, err);
            console.log("Error finding a image");
            return;
        } else if (!imgi) {
            __res(404, "Image not found!");
            console.log("image not found ");
            return;
        } else {
            console.log("Found a image" + imgi);
            res.status(200).json(imgi);
        }
    });

}

module.exports.addAnImage = function (req, res) {

    __res = (status, msg) => res.status(status).send({ message: msg });

    Apartment.findById(req.params.apartmentId).select("images").exec(function (err, pub) {

        if (err) {
            __res(500, err);
            return;
        }

        if (!pub) {
            __res(400, "apartment id not found");
            return;
        }

        console.log(typeof (pub.image));

        if (pub.images == "") {

            pub.images = [];
        }
        pub.images.push({ url: req.body.url,alt:req.body.alt });

        pub.save(function (err, img) {

            if (err) {
                __res(500, err);
                return;
            }
            console.log("successfully added", img);
            res.status(204).json(img);
        });

    });
}

module.exports.updateAnImage = function (req, res) {

    __res = (status, msg) => res.status(status).send({ message: msg });

    Apartment.updateOne({ "_id": req.params.apartmentId, "images._id": req.params.imageId },
        { $set: 
            { "images.$.url": req.body.url ,
              "images.$.alt": req.body.alt }
        },
        function (err, apartment) {

            if (err) {
                __res(500, err);
                return;
            }

            res.status(204).json(apartment);
        }
    );



}

module.exports.deleteAnImage = function (req, res) {

    __res = (status, msg) => res.status(status).send({ message: msg });

    Apartment.findById(req.params.apartmentId).select("images").exec(function (err, apartment) {

        apartment.images.id(req.params.imageId).remove();

        if (err) {
            __res(500, err);
            return;
        }

        if (!apartment) {
            __res(400, "Image id not found");
            return;
        }

        apartment.save(function (err, img) {

            if (err) {
                __res(500, err);
                return;
            }
            console.log("successfully deleted", img);
            res.status(204).json(img);
        });


    });





}




