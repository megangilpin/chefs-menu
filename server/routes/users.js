const express = require("express");

const { errorHandelingWrapper, createAuthResponseObj } = require("../util");
const usersController = require("../controllers/usersController");
const chefsController = require("../controllers/chefsController");
const upload = require("../services/s3");
const profileImgUpload = upload.single("image");

const router = express.Router();

router.get(
  "/",
  errorHandelingWrapper(async (req, res) => {
    const { id } = req.user;
    const user = await usersController.findOneWithId(id);
    if (!user) {
      res.status(400).json({ errors: ["Please sign in"] });
      return;
    }
    if (user.isChef) {
      user.chef = await chefsController.findOneWithUserId(id);
    }
    // create and return jwt with user obj
    const responseObj = await createAuthResponseObj(user);
    res.cookie("token", responseObj.token, { httpOnly: true });
    res.json(responseObj);
  })
);

router.put(
  "/",
  errorHandelingWrapper(async (req, res) => {
    const { id, password, email } = req.user;
    const errors = [];

    if (password && (typeof password !== "string" || password.length < 6))
      errors.push("Invalid password");
    if (email && !usersController.isValidEmailFormat(email))
      errors.push("Invalid email");
    if (errors.length > 0) {
      res.status(400).json({ errors });
      return;
    }

    if (errors.length > 0) {
      res.status(400).json({ errors });
      return;
    }

    const user = await usersController.sanatize(
      await usersController.update(id, req.body)
    );
    const responseObj = await createAuthResponseObj(user);
    res.json(responseObj);
  })
);

// uploads image to AWS s3 and updates user schema with url of profile image
router.post("/profileImageUpload", async function (req, res, next) {
  if (req.files === null) {
    return res.status(400).json({ msg: "No file uploaded" });
  }
  const { id } = req.user;

  // upload image to s3 with the help of multer-s3
  profileImgUpload(req, res, (error) => {
    if (error) {
      return res.status(400).json({
        errors: {
          title: "Image Upload Error",
          detail: error.message,
          error: error,
        },
      });
    } else {
      if (req.file === undefined) {
        console.log("Error: No File Selected!");
        res.json("Error: No File Selected");
      }
    }

    const body = {};
    body.profilePicURL = req.file.location;

    // save the url to the user and return url
    userController
      .update(id, body)
      .then((user) => {
        return res.json(user.profilePicURL);
      })
      .catch((error) => console.log(error));
  });
});

module.exports = router;
