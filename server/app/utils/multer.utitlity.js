const _ = require('lodash');
const multer = require('multer');
const fileObject = require('./file.object');

const storage = multer.diskStorage({
  destination(req, file, cb) {
    if (!req.file)
      req.file = [];

    // if (!file.originalname.match(/\.(jpg|JPG|jpeg|JPEG|png|PNG|gif|GIF)$/)) {
    //   req.fileValidationError = 'Only image files are allowed!';
    //   return cb(new Error('Only image files are allowed!'), false);
    // }

    cb(null, './public/upload');
  },
  filename(req, file, cb) {
    fileObject.setFileObject(file.mimetype, '', `${Date.now()}-${file.originalname}`, file.size, '');

    req.file.push(fileObject.getFileObject());

    // console.log('--------fileObject------>', req.file);
    cb(null, fileObject.FileName);
  },
});

const upload = multer({
  storage
});

module.exports = upload;