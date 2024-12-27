const express = require("express");
const router = express.Router();
const apiController = require("../controllers/api");

router.post("/login", apiController.login);
router.get("/blood_pressure", apiController.blood_pressure);
router.get("/bpm", apiController.bpm);
router.get("/cholesterol", apiController.cholesterol);
router.get("/fat", apiController.fat);
router.get("/metabolicrate", apiController.metabolicrate);
router.get("/step", apiController.step);
router.get("/waistline", apiController.waistline);
router.get("/weight", apiController.weight);
router.get(
    "/distribution_of_chronic_sick",
    apiController.distribution_of_chronic_sick
);
router.get(
    "/gender_distribution_of_chronic_sick",
    apiController.gender_distribution_of_chronic_sick
);
router.get("/sick_bmi", apiController.sick_bmi);

module.exports = router;
