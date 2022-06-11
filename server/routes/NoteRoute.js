const auth = require("../middleware/auth");
const express = require("express");
const router = express.Router();
const noteController = require("../controllers/NoteController");

router.get("/getAllNotes", auth, noteController.getAllNotes);
router.get("/getSingleNote/:id", auth, noteController.getSingleNote);
router.post("/createNote", auth, noteController.createNotes);
router.put("/updateNote/:id", auth, noteController.updateNote);
router.delete("/deleteNote/:id", auth, noteController.deleteNote);


module.exports = router;