require('dotenv').config()
const express = require("express");
const app = express();
const port = 3069;
const router = require("./routes");
const bodyParser = require("body-parser");
const cors = require("cors");

app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use("/api/v1", router);

app.listen(port, () => {
  console.log(`Coffee Shop Backend listening on port ${port}`);
});