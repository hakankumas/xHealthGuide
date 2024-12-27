const express = require("express");
const router = express.Router();
const chronicController = require("../controllers/chronic");

router.get("/", chronicController.index);
router.post("/create", chronicController.create);
router.get("/delete/:id", chronicController.delete);

module.exports = router;
