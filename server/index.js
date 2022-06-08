const express = require('express');
const app = express();
const cors = require("cors");
const connect = require('./config/db')
const userRoute = require('./routes/userRoute');

const PORT = 6800;

app.use(express.json());
app.use(cors());

app.use("/user", userRoute);

app.listen(PORT, async()=>{
    await connect();
    console.log(`Server is connected to port ${PORT}`);
})