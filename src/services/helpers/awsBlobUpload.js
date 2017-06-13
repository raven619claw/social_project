var aws = require('aws-sdk'),
    multer = require('multer'),
    multerS3 = require('multer-s3');

aws.config.update({
    secretAccessKey: process.env.AWS_S3_SECRET_ACCESS_KEY,
    accessKeyId: process.env.AWS_S3_ACCESS_KEY_ID,
    signatureVersion: 'v4'
});

var s3 = new aws.S3();

var upload = multer({
    storage: multerS3({
        s3: s3,
        bucket: process.env.AWS_BUCKET_NAME,
        acl: 'public-read',
        metadata: function(req, file, cb) {
            cb(null, { fieldName: file.fieldname });
        },
        key: function(req, file, cb) { 
            cb(null, Date.now() + file.originalname); //use Date.now() for unique file keys
        }
    })
});

module.exports = upload;
