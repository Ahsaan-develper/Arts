// import multer from "multer";
// import os from "os";

// // os.tmpdir() returns /tmp on Vercel/Linux and correct temp dir on Windows locally
// const uploadDir = os.tmpdir();

// const storage = multer.diskStorage({
//   destination: function (req, file, cb) {
//     cb(null, uploadDir);
//   },
//   filename: function (req, file, cb) {
//     const uniqueSuffix = Date.now() + "-" + Math.round(Math.random() * 1e9);
//     cb(null, file.originalname + "-" + uniqueSuffix);
//   },
// });

// export const uploadFileMulter = multer({
//   storage: storage,
//   limits: { fileSize: 10 * 1024 * 1024 },
// });

import multer from "multer";

const storage = multer.memoryStorage();

export const uploadFileMulter = multer({
  storage: storage,
  limits: { fileSize: 10 * 1024 * 1024 },
}) 