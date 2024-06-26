const auth = require("../middleware/auth");
const express = require("express");
const router = express.Router();
const textEditorController = require("../controllers/TextEditorController");

router.get("/getAllTextData", auth, textEditorController.getAllTextData);
router.get("/getSingleTextData/:id", auth, textEditorController.getSingleTextData);
router.post("/createTextData", auth, textEditorController.createText);
router.delete("/deleteTextData/:id", auth, textEditorController.deleteTextData);
router.put("/updateTextData/:id", auth, textEditorController.updateTextData);

module.exports = router;