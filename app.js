const express = require("express");
const app = express();
const cors = require("cors");
const env = require("dotenv");
env.config();
const connect = require("./server/config/db");
const userRoute = require("./server/routes/userRoute");
const noteRoute = require("./server/routes/NoteRoute");
const PORT = process.env.PORT || 6800
const bodyParser = require('body-parser');
const path = require('path');

app.use(express.json());
app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

app.use("/user", userRoute);
app.use("/note", noteRoute);

app.listen(PORT, async () => {
  await connect();
  console.log(`Server is connected to port ${PORT}`);
});
