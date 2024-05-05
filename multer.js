const multer = require("multer");

class MulterConfig {
  constructor() {
    this.storage = multer.diskStorage({
      destination: this.destination.bind(this),
      filename: this.filename.bind(this)
    });
    this.upload = multer({ storage: this.storage });
  }

  destination(req, file, cb) {
    cb(null, "./public/images");
  }

  filename(req, file, cb) {
    cb(null, file.originalname);
  }
}

module.exports = new MulterConfig().upload;
