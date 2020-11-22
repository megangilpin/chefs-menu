// ROUTER FOR OUR USERS
const express = require("express");
const userController = require("../controllers/usersController");
const upload = require("../services/ImageUpload")
const profileImgUpload = upload.single("image")
const { loginRequired } = require("../middleware");

const router = express.Router();

router.post("/singleImageUpload", loginRequired, async function (req, res, next) {
    if (req.files === null) {
        return res.status(400).json({ msg: 'No file uploaded' });
    }
    profileImgUpload( req, res, ( error ) => {
        if (error) {
            return res.status(400).json({
                errors: {
                    title: "Image Upload Error",
                    detail: error.message,
                    error: error
                }
            });
        } else {
            if( req.file === undefined ){
                console.log( 'Error: No File Selected!' );
                res.json( 'Error: No File Selected' );
            } 
        }

        const imageLocation = req.file.location;
        const bucket = req.file.bucket;
        console.log(bucket)
        // RETURN IMAGE URL FROM AWS S3
        return res.json(imageLocation);
    })
})

module.exports = router;