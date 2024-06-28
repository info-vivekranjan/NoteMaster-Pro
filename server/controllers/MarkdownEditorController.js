const markdownEditor = require("../models/MarkdownEditorModel");

exports.createMarkdown = async (req, res) => {
  const { title, category, content } = req.body;
  const body = { user: req.user._id, title, category, content };

  await markdownEditor.create(body, (error, addedMarkdownData) => {
    if (error) {
      return res.status(500).json({
        code: 2003,
        message: "Something went wrong",
      });
    } else {
      return res.status(200).json({
        code: 2004,
        message: "Markdown data created successfully",
        data: addedMarkdownData,
      });
    }
  });
};

exports.getAllMarkdownData = async (req, res) => {
  const { page = 1, limit = 4 } = req.query;

  try {
    let allMarkdownData = await markdownEditor.find({ user: req.user._id });

    let markdownData = await markdownEditor
      .find({ user: req.user._id })
      .limit(limit * 1)
      .skip((page - 1) * limit)
      .sort({ createdAt: -1 });
    if (markdownData && markdownData.length === 0) {
      return res.status(200).json({
        code: 2000,
        message: "No data available",
        data: markdownData,
      });
    } else {
      return res.status(200).json({
        code: 2001,
        message: "All markdown data fetched successfully",
        data: markdownData,
        count: allMarkdownData && allMarkdownData.length,
        totalPages: Math.ceil(allMarkdownData && allMarkdownData.length / limit),
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

exports.getSingleMarkdownData = async (req, res) => {
  try {
    let markdownData = await markdownEditor.findById(req.params.id);
    if (markdownData && markdownData.length === 0) {
      return res.status(200).json({
        code: 2000,
        message: "No data available",
        data: markdownData,
      });
    } else {
      return res.status(200).json({
        code: 2001,
        message: "Markdown data fetched successfully",
        data: markdownData,
        count: markdownData.length,
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

exports.deleteMarkdownData = async (req, res) => {
  try {
    const deletedMarkdownData = await markdownEditor.findByIdAndDelete(req.params.id);
    return res.status(204).json({
      code: 2001,
      message: "Markdown data deleted successfully",
      data: deletedMarkdownData,
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      code: 2010,
      message: "Something went wrong",
    });
  }
};

exports.updateMarkdownData = async (req, res) => {
  const { title, category, content } = req.body;
  const body = {
    title,
    content,
    category,
  };
  try {
    const updatedMarkdownData = await markdownEditor.findByIdAndUpdate(req.params.id, body, {
      new: true,
    });
    if (updatedMarkdownData && updatedMarkdownData.length === 0) {
      return res.status(200).json({
        code: 2000,
        message: "No Data Found",
        data: updatedMarkdownData,
      });
    } else {
      return res.status(200).json({
        code: 2001,
        message: "Markdown data updated successfully",
        data: updatedMarkdownData,
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
