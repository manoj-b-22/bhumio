const fs = require("fs");
const path = require("path");
const bodyParser = require("body-parser");
const multer = require("multer");
const express = require("express");
const cors = require("cors");

const app = express();

const port = 5000;

let folder = "./uploads";
if (!fs.existsSync(folder)) {
  fs.mkdirSync(folder);
  console.log(`${folder} created successfully`);
}

app.use(cors());
app.use(bodyParser.urlencoded({ extended: true }));

const nameFile = (file) => {
  const date = new Date(Date.now());
  const name = file.originalname;
  const ext = (name.match(/\.+[\S]+$/) || [])[0];

  const filename =
    name.slice(0, name.length - ext.length) +
    "_" +
    date.toISOString().replace(/:/g, "-") +
    ext;

  return filename;
};

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, path.join(__dirname, "/uploads"));
  },
  filename: function (req, file, cb) {
    cb(null, nameFile(file));
  },
});

const upload = multer({ storage: storage });

app.get("/", (req, res) => {
  res.send("Bhumio Inc backend");
});

app.post("/submit", upload.array("file"), (req, res) => {
  console.log(`${req.files} files saved to uploads folder`);
  res.json({ message: "files uploaded successfully" });
});

app.listen(port, () => {
  console.log(`App listening on port ${port}`);
});
