const path = require("path");
const fs = require("fs");
const multer = require("multer");
const createHttpError = require("http-errors");

function createRoute(req) {
    const date = new Date();
    const year = date.getFullYear().toString();
    const month = date.getMonth().toString();
    const day = date.getDate().toString();
    const directory = path.join(__dirname , ".." , ".." , "public" , "uploads" , "blogs" , year , month , day);
    req.body.fileUploadPath = path.join("uploads" , "blogs" , year , month , day);
    fs.mkdirSync(directory , {recursive: true});
    return directory;
}

const storage = multer.diskStorage({
    destination: (req , file , cb) => {
        if(file?.originalname) {
            const filePath = createRoute(req);
            return cb(null , filePath);
        }
        else {
            return cb(null , null);
        }
    },
    filename: (req , file , cb) => {
        if(file?.originalname) {
            const ext = path?.extname(file.originalname);
            const fileName = String(new Date().getTime() + ext);
            req.body.filename = fileName;
            return cb(null , fileName);
        }
        else {
            return cb(null , null);
        }
    }
});

function fileFilter(req , file , cb) {
    const ext = path.extname(file.originalname);
    const mimeTypes = [".jpg" , ".jpeg" , ".png" , ".webp"];
    if(mimeTypes.includes(ext)) {
        cb(null , true)
    }
    else {
        cb(createHttpError.BadRequest("فرمت تصویر صحیح نمی باشد") , false);
    }
}

function vidoeFilter(req , file , cb) {
    console.log("ssd" , req.file);

    const ext = path.extname(file.originalname);
    const mimeTypes = [".mp4" , ".mpeg" , ".mpg" , ".mov" , ".avi" , ".mkv"];
    if(mimeTypes.includes(ext)) {
        cb(null , true);
    }
    else {
        cb(createHttpError.BadRequest("فرمت ویدئو صحیح نمی باشد"))
    }
}

const pictureMaxSize = 400 * 1000;
const uploadFile = multer({storage , fileFilter , limits: {fileSize: pictureMaxSize} });


const vidoeMaxSize = 300 * 1000 * 1000;
const uploadVideo = multer({storage , vidoeFilter , limits: {fileSize: vidoeMaxSize} });

module.exports = {
    uploadFile,
    uploadVideo
}