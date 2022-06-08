const auth = require("../middleware/auth");
const express = require("express");
const router = express.Router();
const noteController = require("../controllers/NoteController");

router.get("/getAllNotes", auth, noteController.getAllNotes);
router.post("/createNote", auth, noteController.createNotes);

module.exports = router;