const AWS = require("aws-sdk");
const stream = require("stream");
const S3 = new AWS.S3();
const readStream = ({ Bucket, key }) => {
  return S3.getObject({ Bucket, key }).createReadStream();
};
const writeStream = ({ Bucket, key }) => {
  const passThrough = new stream.PassThrough();
  return {
    writeStream: passThrough,
    uploaded: S3.upload({
      ContentType: "image/png",
      Body: passThrough,
      Bucket,
      Key
    }).promise()
  };
};
module.exports = {
  readStream,
  writeStream
};
