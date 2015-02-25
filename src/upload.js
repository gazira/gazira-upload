var Class = require('arale-class');
var SwfUpload = require('./upload-swfupload');
var Html5Upload = require('./upload-html5');
var Upload = Class.create({
    Extends: Html5Upload.isSupportHTML5Upload ? Html5Upload : SwfUpload
});
Upload.isSupportHTML5Upload = Html5Upload.isSupportHTML5Upload;

module.exports = Upload;
