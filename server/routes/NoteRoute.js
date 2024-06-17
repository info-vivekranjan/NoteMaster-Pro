const auth = require("../middleware/auth");
const express = require("express");
const router = express.Router();
const noteController = require("../controllers/NoteController");
const multer = require('multer');
const upload = multer({ dest: 'uploads/notes/' })


router.get("/getAllNotes", auth, noteController.getAllNotes);
router.get("/getSingleNote/:id", auth, noteController.getSingleNote);
router.post("/createNote", auth, upload.single('file'), noteController.createNotes);
router.put("/updateNote/:id", auth, noteController.updateNote);
router.delete("/deleteNote/:id", auth, noteController.deleteNote);


module.exports = router;