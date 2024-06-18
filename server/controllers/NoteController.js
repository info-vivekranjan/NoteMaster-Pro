const notes = require("../models/NoteModel");

exports.createNotes = async (req, res) => {
  const { title, content, category } = req.body;
  const anyfile = req?.file?.path;
  const body = { user: req.user._id, title, content, category, anyfile };

  console.log(body);

  await notes.create(body, (error, addedNotes) => {
    if (error) {
      return res.status(500).json({
        code: 2003,
        message: "Something went wrong",
      });
    } else {
      return res.status(200).json({
        code: 2004,
        message: "Note created successfully",
        data: addedNotes,
      });
    }
  });
};

exports.getAllNotes = async (req, res) => {
  const {page=1, limit=4} = req.query;

  try {
    let allNoteData = await notes
    .find({ user: req.user._id });

    let noteData = await notes
      .find({ user: req.user._id })
      .limit(limit * 1)
      .skip((page - 1) * limit)
      .sort({ createdAt: -1 });
    if (noteData && noteData.length === 0) {
      return res.status(200).json({
        code: 2000,
        message: "No data available",
        data: noteData,
      });
    } else {
      return res.status(200).json({
        code: 2001,
        message: "All notes fetched successfully",
        data: noteData,
        count: allNoteData && allNoteData.length,
        totalPages: Math.ceil(allNoteData && allNoteData.length / limit),
        currentPage: page,
      });
    }
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      code: 2010,
      message: "something went wrong",
    });
  }
};

exports.getSingleNote = async (req, res) => {
  try {
    let noteData = await notes.findById(req.params.id);
    if (noteData && noteData.length === 0) {
      return res.status(200).json({
        code: 2000,
        message: "No data available",
        data: noteData,
      });
    } else {
      return res.status(200).json({
        code: 2001,
        message: "Note fetched successfully",
        data: noteData,
        count: noteData.length,
      });
    }
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      code: 2010,
      message: "something went wrong",
    });
  }
};

exports.deleteNote = async (req, res) => {
  try {
    const deletedNote = await notes.findByIdAndDelete(req.params.id);
    return res.status(204).json({
      code: 2001,
      message: "Note deleted successfully",
      data: deletedNote,
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      code: 2010,
      message: "Something went wrong",
    });
  }
};

exports.updateNote = async (req, res) => {
  const anyfile = req?.file?.path;
  const { title, content, category } = req.body;
  const body = {
    title,
    content,
    category,
    anyfile
  };
  try {
    const updatedNote = await notes.findByIdAndUpdate(req.params.id, body, {
      new: true,
    });
    if (updatedNote && updatedNote.length === 0) {
      return res.status(200).json({
        code: 2000,
        message: "No Data Found",
        data: updatedNote,
      });
    } else {
      return res.status(200).json({
        code: 2001,
        message: "Note updated successfully",
        data: updatedNote,
      });
    }
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      code: 2010,
      message: "Something went wrong",
    });
  }
};
