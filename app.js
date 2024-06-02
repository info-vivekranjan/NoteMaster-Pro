const express = require("express");
const app = express();
const cors = require("cors");
const env = require("dotenv");
env.config();
const connect = require("./server/config/db");
const userRoute = require("./server/routes/userRoute");
const noteRoute = require("./server/routes/NoteRoute");
const PORT = process.env.PORT || 6800

app.use(express.json());
app.use(cors());

app.use("/user", userRoute);
app.use("/note", noteRoute);

app.listen(PORT, async () => {
  await connect();
  console.log(`Server is connected to port ${PORT}`);
});
