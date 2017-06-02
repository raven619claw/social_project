var aws = require('aws-sdk'),
    multer = require('multer'),
    multerS3 = require('multer-s3');

aws.config.update({
    secretAccessKey: 'qgCFZ4+b3Rd7Es/kWLuSKpKZS/9aEIRkd5dIXrAI',
    accessKeyId: 'AKIAIAI5ONRBJZZSNYSQ',
    signatureVersion: 'v4'
});

var s3 = new aws.S3();

var upload = multer({
    storage: multerS3({
        s3: s3,
        bucket: 'app-social',
        acl: 'public-read',
        metadata: function(req, file, cb) {
            cb(null, { fieldName: file.fieldname });
        },
        key: function(req, file, cb) {
            console.log(file);
            cb(null, Date.now() + file.originalname); //use Date.now() for unique file keys
        }
    })
});

module.exports = upload;
