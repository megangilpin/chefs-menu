const aws = require("aws-sdk");
const multer = require("multer");
const multerS3 = require("multer-s3");

const s3 = new aws.S3({});

aws.config.update({
    accessKeyId: process.env.ACCESS_KEY_ID,
    secretAccessKey: process.env.SECRET_ACCESS_KEY,
    region: "us-east-2",
});

// CHECKS THAT FILE IS CORRECT IMAGE TYPE
const fileFilter = (req, file, cb) => {
    if (file.mimetype === "image/jpeg" || file.mimetype === "image/png") {
        cb(null, true);
    } else {
        cb(new Error("Invalid file type, only JPEG or PNG!"), false);
    }
};

// MIDDLEWARE TO EASILY HANDLE MULTIPART/FORM-DATA UPLOAD
const upload = multer({
    fileFilter,
    storage: multerS3({
        acl: "public-read",
        s3,
        bucket: "teamcornpops-images",
        metadata: function (req, file, cb) {
            cb(null, { fieldName: "PROFILE_PICTURE" });
        },
        key: function (req, file, cb) {
            cb(null, `${req.user.id}-${Date.now().toString()}`);
        },
    }),
});

module.exports = upload;
