const multer = require("multer");
const propertyServices = require("../services/Property.services");

const upload = multer({
  dest: "public/property/",
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

exports.createPropertyController = async (req, res, next) => {
  try {
    upload.single("image")(req, res, async (err) => {
      if (err) {
        return next(err);
      }

      const data = req.body;
      console.log("🚀 ~ upload.single ~ data:", data);

      let imageUrl = null;
      if (req.file) {
        const uploadsDir = path.join(__dirname, "..", "public", "property");
        if (!fs.existsSync(uploadsDir)) {
          fs.mkdirSync(uploadsDir, { recursive: true });
        }

        const filename = `${userId}${path.extname(req.file.originalname)}`;
        //   const filename = propertyID;
        fs.renameSync(req.file.path, path.join(uploadsDir, filename));

        imageUrl = `/property/${filename}`;
      }

      data.image = imageUrl;

      const response = await propertyServices.addPropertyService(data);
      return res.status(200).json({ success: true, data: response });
    });
  } catch (error) {
    next(error);
  }
};

exports.updatePropertyController = async (req, res, next) => {
  try {
    upload.single("image")(req, res, async (err) => {
      if (err) {
        return next(err);
      }

      const data = req.body;
      const propertyID = req.params.id;

      let imageUrl = null;
      if (req.file) {
        const uploadsDir = path.join(__dirname, "..", "public", "property");
        if (!fs.existsSync(uploadsDir)) {
          fs.mkdirSync(uploadsDir, { recursive: true });
        }

        //   const filename = `${userId}${path.extname(req.file.originalname)}`;
        const filename = propertyID;
        fs.renameSync(req.file.path, path.join(uploadsDir, filename));

        imageUrl = `/property/${filename}`;
      }

      data.image = imageUrl;

      const response = await propertyServices.updatePropertyService(
        propertyID,
        data
      );
      return res.status(200).json({ success: true, data: response });
    });
  } catch (error) {
    next(error);
  }
};

exports.getAllPropertyController = async (req, res, next) => {
  try {
    const response = await propertyServices.getAllPropertiesService();
    return res.status(200).json({ success: true, data: response });
  } catch (error) {
    next(error);
  }
};

exports.getPropertyByOwnerIDController = async (req, res, next) => {
  try {
    const ownerID = req.params.ownerID;
    const response = await propertyServices.getPropertyByOwnerService(ownerID);
    return res.status(200).json({ success: true, data: response });
  } catch (error) {
    next(error);
  }
};
exports.serachPropertyByNameController = async (req, res, next) => {
  try {
    const propertyName = req.query.propertyName;
    const response = await propertyServices.searchPropertyByNameService(
      propertyName
    );
    return res.status(200).json({ success: true, data: response });
  } catch (error) {
    next(error);
  }
};

exports.deleteProperty = async (req, res, next) => {
  try {
    const id = req.params.id;
    const result = await propertyServices.deletePropertyService(id);
    return res.status(200).json({ success: true, message: "Property deleted" });
  } catch (error) {
    next(error);
  }
};
