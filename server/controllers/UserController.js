const User = require("../models/UserModel");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

exports.registerUser = async (req, res) => {
  try {
    // Get user input
    const { name, email, password, pic } = req.body;

    const params = {};
    if (name) {
      params.name = name;
    }
    if (email) {
      params.email = email;
    }
    if (password) {
      params.password = password;
    }
    if (pic) {
      params.pic = pic;
    }

    // Validate user input
    if (!(params?.email && params?.password && params?.name)) {
      res.status(400).send({ message: "All input is required" });
    }

    // check if user already exist
    // Validate if user exist in our database
    const oldUser = await User.findOne({ email: params?.email });

    if (oldUser) {
      return res
        .status(409)
        .send({ message: "User Already Exist. Please Login" });
    }

    //Encrypt user password
    let encryptedPassword = await bcrypt.hash(params?.password, 10);

    // Create user in our database
    const user = await User.create({
      name: params?.name,
      email: params?.email.toLowerCase(),
      password: encryptedPassword,
      pic: params?.pic,
    });

    // Create token
    const token = jwt.sign(
      { user_id: user._id, email: params?.email },
      "TodoToken123",
      {
        expiresIn: "3600d",
      }
    );
    // save user token
    user.token = token;

    // return new user
    res.status(201).json(user);
  } catch (err) {
    console.log(err);
  }
};

exports.loginUser = async (req, res) => {
  try {
    // Get user input
    const { email, password } = req.body;

    const params = {};
    if (email) {
      params.email = email;
    }
    if (password) {
      params.password = password;
    }

    // Validate user input
    if (!(params?.email && params?.password)) {
      res.status(400).send({ message: "All input is required" });
    }
    // Validate if user exist in our database
    const user = await User.findOne({ email: params?.email });

    if (user && (await bcrypt.compare(params?.password, user.password))) {
      // Create token
      const token = jwt.sign(
        { user_id: user._id, email: params.email },
        "TodoToken123",
        {
          expiresIn: "3600d",
        }
      );

      // save user token
      user.token = token;

      // user
      res.status(200).json({
        code: 2001,
        message: "Signed in successfully",
        data: user,
      });
    }
    res.status(400).send({ message: "Invalid Credentials" });
  } catch (err) {
    return res.status(500).json({
      code: 2002,
      message: "Something went wrong",
    });
  }
};
