const express = require("express");
const app = express();
const cors = require("cors");
const env = require("dotenv");
env.config();
const path = require("path");
const connect = require("./config/db");
const userRoute = require("./routes/userRoute");
const noteRoute = require("./routes/NoteRoute");

app.use(express.json());
app.use(cors());

app.use("/user", userRoute);
app.use("/note", noteRoute);

// --------------------------deployment------------------------------
// const __dirname = path.resolve();

if (process.env.NODE_ENV === "production") {
  app.use(express.static(path.join(__dirname, "../client/build")));

  app.get("*", (req, res) =>
    res.sendFile(path.resolve(__dirname, "client", "build", "index.html"))
  );
} else {
  app.get("/", (req, res) => {
    res.send("API is running..");
  });
}
// --------------------------deployment------------------------------

app.listen(process.env.PORT, async () => {
  await connect();
  console.log(`Server is connected to port ${process.env.PORT}`);
});
