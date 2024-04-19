const userServices = require("../services/user.services");
const multer = require("multer");
const fs = require("fs");

exports.createUserController = async (req, res, next) => {
  try {
    const data = req.body;
    const response = await userServices.createUserService(data);
    return res.status(200).json({ success: true, data: response });
  } catch (error) {
    next(error);
  }
};

exports.loginController = async (req, res, next) => {
  try {
    const data = req.body;
    const response = await userServices.loginUserService(data);
    return res.status(200).json({ succes: true, user: response });
  } catch (error) {
    next(error);
  }
};

exports.retrievePasswordController = async (req, res, next) => {
  try {
    const emailAddress = req.params.emailAddress;
    const response = await userServices.retrievePasswordService(emailAddress);
    return res.status(200).json({ success: true, password: response });
  } catch (error) {
    next(error);
  }
};

const upload = multer({
  dest: "public/users/",
  //   limits: { fileSize: 1000000 },
  fileFilter: (req, file, cb) => {
    const allowedExtensions = [".jpg", ".jpeg", ".png"];
    const extname = path.extname(file.originalname);
    if (allowedExtensions.includes(extname)) {
      cb(null, true);
    } else {
      cb(new Error("Only JPG, JPEG, and PNG files are allowed!"));
    }
  },
});

exports.updateUserController = async (req, res, next) => {
  try {
    const userId = req.params.id;
    upload.single("image")(req, res, async (err) => {
      if (err) {
        return next(err);
      }

      const data = req.body;

      let imageUrl = null;
      if (req.file) {
        const uploadsDir = path.join(__dirname, "..", "public", "users");
        if (!fs.existsSync(uploadsDir)) {
          fs.mkdirSync(uploadsDir, { recursive: true });
        }

        // const filename = `${userId}${path.extname(req.file.originalname)}`;
        const filename = userId;

        fs.renameSync(req.file.path, path.join(uploadsDir, filename));

        imageUrl = `/users/${filename}`;
      }

      data.userImage = imageUrl;

      const response = await userServices.updateUserWithImage(userId, data);
      return res.status(200).json({ success: true, data: response });
    });
  } catch (error) {
    next(error);
  }
};
