// ROUTER FOR OUR USERS
const express = require("express");
const userController = require("../controllers/usersController");
const upload = require("../services/ImageUpload")
const profileImgUpload = upload.single("image")
const { loginRequired } = require("../middleware");

const router = express.Router();

router.post("/imageUpload", loginRequired, async function (req, res, next) {
    console.log("I am working")
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
        // If Success
			// const imageName = req.file.key;
            const imageLocation = req.file.location;

        return res.json(imageLocation);
    })
})

module.exports = router;


// {
//     “data”: {
//     “ETag”: “a number”,
//     “Location”: “full link of the file”,
//     “key”: “original file name of the file that I uploaded”,
//     “Key”: “original file name of the file that I uploaded”,
//     “Bucket”: “my AWS s3 bucket name”
//     }