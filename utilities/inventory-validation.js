const utilities = require("../utilities");
const invModel = require("../models/inventory-model");
const { body, validationResult } = require("express-validator");
const validate = {};

validate.classificationRules = () => {
  return [
    body("classification_name")
      .trim()
      .escape()
      .notEmpty()
      .withMessage("Please provide a classification name.")
      .isLength({ min: 1 })
      .withMessage("Classification name must be at least 1 character long.")
      .matches(/^[a-z0-9]+$/i)
      .withMessage("Classification name must contain only alphanumeric characters.")
      .custom(async (value) => {
        const lowercaseValue = value.toLowerCase();
        const existingClassification = await invModel.getClassificationByName(lowercaseValue);
        if (existingClassification) {
          throw new Error("Classification already exists (case-insensitive).");
        }
        return true;
      }),
  ];
};

validate.checkClassificationData = async (req, res, next) => {
  const { classification_name } = req.body;
  let errors = [];
  errors = validationResult(req);
  if (!errors.isEmpty()) {
    let nav = await utilities.getNav();
    res.render("inventory/addClassification", {
      errors,
      title: "Add Classification",
      nav,
      classification_name,
    });
    return;
  }
  next();
};

validate.inventoryRules = () => {
  return [
    body("inv_make")
      .trim()
      .escape()
      .notEmpty()
      .withMessage("Make value is missing")
      .isLength({ min: 1 })
      .withMessage("Please provide a make."),

    body("inv_model")
      .trim()
      .escape()
      .notEmpty()
      .isLength({ min: 1 })
      .withMessage("Please provide a model."),

    body("inv_year")
      .trim()
      .escape()
      .notEmpty()
      .withMessage("Year value missing.")
      .isNumeric()
      .withMessage("Year must be a number."),

    body("inv_description")
      .trim()
      .escape()
      .notEmpty()
      .isLength({ min: 1 })
      .withMessage("Please provide a description."),

    body("inv_image")
      .trim()
      .escape()
      .notEmpty()
      .isLength({ min: 1 })
      .withMessage("Please provide an image."),

    body("inv_thumbnail")
      .trim()
      .escape()
      .notEmpty()
      .isLength({ min: 1 })
      .withMessage("Please provide a thumbnail."),

    body("inv_price")
      .trim()
      .escape()
      .notEmpty()
      .withMessage("Price value is missing.")
      .isNumeric()
      .withMessage("Price must be a number."),

    body("inv_miles")
      .trim()
      .escape()
      .notEmpty()
      .withMessage("Miles value is missing.")
      .isNumeric()
      .withMessage("Miles must be a number."),

    body("inv_color")
      .trim()
      .escape()
      .notEmpty()
      .isLength({ min: 1 })
      .withMessage("Please provide a color."),

    body("classification_id")
      .trim()
      .escape()
      .notEmpty()
      .isLength({ min: 1 })
      .isInt()
      .withMessage("Please provide a make."),
  ];
};

validate.checkInventoryData = async (req, res, next) => {
  let errors = [];
  errors = validationResult(req);

  if (!errors.isEmpty()) {
    const {
      inv_make,
      inv_model,
      inv_year,
      inv_description,
      inv_image,
      inv_thumbnail,
      inv_price,
      inv_miles,
      inv_color,
      classification_id,
    } = req.body;
    let classifications = await utilities.buildClassificationList(
      classification_id
    );
    let nav = await utilities.getNav();
    res.render("inventory/addInventory", {
      errors,
      title: "Add Inventory",
      nav,
      classifications,
      inv_make,
      inv_model,
      inv_year,
      inv_description,
      inv_image,
      inv_thumbnail,
      inv_price,
      inv_miles,
      inv_color,
    });
    return;
  }
  next();
};

validate.checkUpdateData = async (req, res, next) => {
  let errors = [];
  errors = validationResult(req);

  if (!errors.isEmpty()) {
    const {
      inv_id,
      inv_make,
      inv_model,
      inv_year,
      inv_description,
      inv_image,
      inv_thumbnail,
      inv_price,
      inv_miles,
      inv_color,
      classification_id,
    } = req.body;
    let classifications = await utilities.buildClassificationList(
      classification_id
    );
    let nav = await utilities.getNav();
    res.render("inventory/editInventory", {
      errors,
      title: "Edit " + inv_make + " " + inv_model,
      nav,
      classifications,
      inv_id,
      inv_make,
      inv_model,
      inv_year,
      inv_description,
      inv_image,
      inv_thumbnail,
      inv_price,
      inv_miles,
      inv_color,
    });
    return;
  }
  next();
};


module.exports = validate;