const express = require("express");
const router = express.Router();
const userControllers = require("../controllers/user.controllers");
const propertyControllers = require("../controllers/property.controller");

router.get("/", async (req, res, next) => {
  try {
    return res.send("Root route is working");
  } catch (error) {
    next(error);
  }
});

router.post("/register", userControllers.createUserController);
router.post("/login", userControllers.loginController);
router.get("/user/:emailAddress", userControllers.retrievePasswordController);
router.patch("/user/:id", userControllers.updateUserController);

router.post("/property", propertyControllers.createPropertyController);
router.post(
  "/property/:ownerID",
  propertyControllers.getPropertyByOwnerIDController
);

module.exports = router;
