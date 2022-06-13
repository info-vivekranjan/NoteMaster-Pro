const express = require("express");
const app = express();
const cors = require("cors");
const env = require("dotenv");
env.config();
const connect = require("./config/db");
const userRoute = require("./routes/userRoute");
const noteRoute = require("./routes/NoteRoute");

app.use(express.json());
app.use(cors());

app.use("/user", userRoute);
app.use("/note", noteRoute);

app.listen(process.env.PORT, async () => {
  await connect();
  console.log(`Server is connected to port ${process.env.PORT}`);
});
