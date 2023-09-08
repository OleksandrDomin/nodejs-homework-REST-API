const express = require("express");
const contactController = require("../../controllers/contacts");
const router = express.Router();
const jsonParser = express.json();
const ctrlWrapper = require("../../helpers/ctrlWrapper");
const validateData = require("../../middlewares/validateData");
const validatePatch = require("../../middlewares/validatePatch");
const validateId = require("../../middlewares/validateId");
const {
  schemaJoi,
  schemaJoiPatch,
  schemaJoiId,
} = require("../../schemas/contacts");
const { validateToken } = require("../../middlewares/validateToken");

router.get("/", ctrlWrapper(validateToken), contactController.getAll);
router.post(
  "/",
  jsonParser,
  
    ctrlWrapper(validateData(schemaJoi)),
  ctrlWrapper(validateToken),
  contactController.create
);

router.get(
  "/:id",
 
    ctrlWrapper(validateId(schemaJoiId)),
   ctrlWrapper(validateToken),
  contactController.getById
);
router.delete(
  "/:id",

    ctrlWrapper(validateId(schemaJoiId)),
    ctrlWrapper(validateToken),
  contactController.remove
);
router.put(
  "/:id",
  jsonParser,

  ctrlWrapper(validateId(schemaJoiId)),
    ctrlWrapper(validateData(schemaJoi)),
    ctrlWrapper(validateToken),
  contactController.update
);

router.patch(
  "/:id/favorite",
  jsonParser,
  ctrlWrapper(validateId(schemaJoiId)),
  ctrlWrapper(validatePatch(schemaJoiPatch)),
  ctrlWrapper(validateToken),
  contactController.updateStatus
);

module.exports = router;
