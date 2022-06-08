const notes = require("../models/NoteModel");

exports.createNotes = async (req, res) => {
  const { title, content, category } = req.body;
  const body = { user: req.user._id, title, content, category };

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
  const pageNumber = parseInt(req.query.pageNumber) || 0;
  const pageSize = parseInt(req.query.pageSize) || 10;
  const skip = pageNumber * pageSize;

  try {
    let noteData = await notes
      .find({ user: req.user._id })
      .limit(pageSize)
      .skip(skip);
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
