import multer , {diskStorage} from "multer";
import fs from "fs";
import path from "path";

const uploadDir = "./public/temp";

if (!fs.existsSync(uploadDir) ){
    fs.mkdirSync(uploadDir , {recursive : true});
}




const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, uploadDir)
  },
  filename: function (req, file, cb) {
    const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9)

    cb(null, file.originalname + '-' + uniqueSuffix)
  }
});


export const uploadFileMulter = multer({ storage: storage  , limits : 10 * 1024 * 1024});