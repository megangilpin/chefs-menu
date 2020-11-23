const express = require("express");

const { errorHandelingWrapper, createAuthResponseObj } = require("../util");
const userController = require("../controllers/usersController");
const chefsController = require("../controllers/chefsController");

const router = express.Router();

router.get(
  "/",
  errorHandelingWrapper(async (req, res) => {
    const { id } = req.user;
    const user = await userController.findOneWithId(id);
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
    const { id } = req.user;
    const errors = [];

    if (password && (typeof password !== "string" || password.length < 6))
      errors.push("Invalid password");
    if (email && !userController.isValidEmailFormat(email))
      errors.push("Invalid email");
    if (errors.length > 0) {
      res.status(400).json({ errors });
      return;
    }

    const user = await usersController.sanatize(
      await usersController.update(id, req.body)
    );
    res.json(user);
  })
);

router.post("/profileImageUpload", async function (req, res, next) {
  if (req.files === null) {
    return res.status(400).json({ msg: "No file uploaded" });
  }
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

    const imageLocation = req.file.location;
    const bucket = req.file.bucket;
    console.log(bucket);
    // RETURN IMAGE URL FROM AWS S3
    return res.json(imageLocation);
  });
});

module.exports = router;
