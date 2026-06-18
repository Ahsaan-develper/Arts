import multer from "multer";
import fs from "fs";

const uploadDir = process.env.NODE_ENV === "production" ? "/tmp" : "./public/temp";

if (process.env.NODE_ENV !== "production") {
  if (!fs.existsSync(uploadDir)) {
    fs.mkdirSync(uploadDir, { recursive: true });
  }
}

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, uploadDir);
  },
  filename: function (req, file, cb) {
    const uniqueSuffix = Date.now() + "-" + Math.round(Math.random() * 1e9);
    cb(null, file.originalname + "-" + uniqueSuffix);
  },
});

export const uploadFileMulter = multer({
  storage: storage,
  limits: { fileSize: 10 * 1024 * 1024 },
});