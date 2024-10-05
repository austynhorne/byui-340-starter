// Needed resources
const express = require("express");
const router = new express.Router();
const intentionalErrorController = require("../controllers/intentionalErrorController");
const utilities = require("../utilities");

// Middleware causes an error
router.use("/", utilities.handleErrors(async (req, res, next) => {
    next();
}));

router.get("/", utilities.handleErrors(intentionalErrorController.causeError));

module.exports = router;