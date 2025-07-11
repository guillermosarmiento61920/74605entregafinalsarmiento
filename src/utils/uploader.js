import __dirname from "./index.js";
import multer from "multer";

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    if (req.url.includes("/pets/withimage")) {
      cb(null, `${__dirname}/../public/img`);
    } else if (req.url.includes("/documents")) {
      cb(null, `${__dirname}/../public/documents`);
    } else {
      cb(null, `${__dirname}/../public/others`);
    }
  },
  filename: function (req, file, cb) {
    cb(null, `${Date.now()}-${file.originalname}`);
  },
});

const uploader = multer({ storage });

export default uploader;
