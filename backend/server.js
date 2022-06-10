const path = require("path");
const bodyParser = require("body-parser");
const multer = require("multer");
const express = require("express");
const cors = require("cors");

const app = express();

const port = 5000;

app.use(cors());
app.use(bodyParser.urlencoded({ extended: true }));

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, path.join(__dirname, "/uploads"));
  },
  filename: function (req, file, cb) {
    const date = new Date(Date.now());
    const name = file.originalname;
    const ext = (name.match(/\.+[\S]+$/) || [])[0];
    cb(
      null,
      name.slice(0, name.length - ext.length) +
        "_" +
        date.toISOString().replace(/:/g, "-") +
        ext
    );
  },
});

const upload = multer({ storage: storage });

app.get("/", (req, res) => {
  res.send("Bhumio Inc backend");
});

app.post("/submit", upload.array("file"), (req, res) => {
  console.log(req.files);
  console.log("saved to uploads folder");
  res.json({ message: "files uploaded successfully" });
});

app.listen(port, () => {
  console.log(`App listening on port ${port}`);
});
