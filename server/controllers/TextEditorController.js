const textEditor = require("../models/TextEditorModel");

exports.createText = async (req, res) => {
  const { title, category, content } = req.body;
  const body = { user: req.user._id, title, category, content };

  console.log(body);

  await textEditor.create(body, (error, addedTextData) => {
    if (error) {
      return res.status(500).json({
        code: 2003,
        message: "Something went wrong",
      });
    } else {
      return res.status(200).json({
        code: 2004,
        message: "Text data created successfully",
        data: addedTextData,
      });
    }
  });
};

exports.getAllTextData = async (req, res) => {
  const {page=1, limit=4} = req.query;

  try {
    let allTextData = await textEditor
    .find({ user: req.user._id });

    let textData = await textEditor
      .find({ user: req.user._id })
      .limit(limit * 1)
      .skip((page - 1) * limit)
      .sort({ createdAt: -1 });
    if (textData && textData.length === 0) {
      return res.status(200).json({
        code: 2000,
        message: "No data available",
        data: textData,
      });
    } else {
      return res.status(200).json({
        code: 2001,
        message: "All text data fetched successfully",
        data: textData,
        count: allTextData && allTextData.length,
        totalPages: Math.ceil(allTextData && allTextData.length / limit),
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


exports.getSingleTextData = async (req, res) => {
    try {
      let textData = await textEditor.findById(req.params.id);
      if (textData && textData.length === 0) {
        return res.status(200).json({
          code: 2000,
          message: "No data available",
          data: textData,
        });
      } else {
        return res.status(200).json({
          code: 2001,
          message: "Text data fetched successfully",
          data: textData,
          count: textData.length,
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
  
  exports.deleteTextData = async (req, res) => {
    try {
      const deletedTextData = await textEditor.findByIdAndDelete(req.params.id);
      return res.status(204).json({
        code: 2001,
        message: "Text data deleted successfully",
        data: deletedTextData,
      });
    } catch (error) {
      console.log(error);
      return res.status(500).json({
        code: 2010,
        message: "Something went wrong",
      });
    }
  };