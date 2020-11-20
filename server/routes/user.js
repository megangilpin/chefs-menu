// ROUTER FOR OUR USERS
const express = require("express");
const userController = require("../controllers/usersController");
const upload = require("../services/ImageUpload")
const profileImgUpload = upload.single("image")

const router = express.Router();

router.post("/imageUpload", async function (req, res, next) {
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
        console.log(req.file.location)
        return req.file.location;
    })
})

module.exports = router;
