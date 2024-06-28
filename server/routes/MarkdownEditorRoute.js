const auth = require("../middleware/auth");
const express = require("express");
const router = express.Router();
const markdownEditorController = require("../controllers/MarkdownEditorController");

router.get("/getAllMarkdownData", auth, markdownEditorController.getAllMarkdownData);
router.get("/getSingleMarkdownData/:id", auth, markdownEditorController.getSingleMarkdownData);
router.post("/createMarkdownData", auth, markdownEditorController.createMarkdown);
router.delete("/deleteMarkdownData/:id", auth, markdownEditorController.deleteMarkdownData);
router.put("/updateMarkdownData/:id", auth, markdownEditorController.updateMarkdownData);

module.exports = router;