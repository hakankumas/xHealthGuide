const express = require("express");
const router = express.Router();
const sickController = require("../controllers/sick");

router.post("/create_data", sickController.create_data);
router.post("/create", sickController.create);
router.get("/delete/:id", sickController.delete);
router.post("/create_chronic", sickController.create_chronic);
router.get("/delete_chronic/:id", sickController.delete_chronic);

module.exports = router;
