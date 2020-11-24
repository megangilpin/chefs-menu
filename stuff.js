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
