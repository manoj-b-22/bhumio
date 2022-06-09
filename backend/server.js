const path = require("path");
const multer = require("multer");
const express = require("express");
const cors = require('cors')

const app = express();

const port = 5000;

app.use(cors)
app.use(express.urlencoded({ extended: false }));

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, path.join(__dirname, "/uploads"));
  },
  filename: function (req, file, cb) {
    const date = new Date(Date.now());
    cb(null, file.originalname + "_" + date.toISOString().replace(/:/g, "-"));
  },
});

const upload = multer({ storage: storage });

app.get("/", (req, res) => {
  res.send("Bhumio Inc backend");
});

app.post("/submit", upload.array("file"), (req, res) => {
  console.log(req);
  res.json({ message: "files uploaded successfully" });
});

app.listen(port, () => {
  console.log(`App listening on port ${port}`);
});
