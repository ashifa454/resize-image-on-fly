const s3Helper = require("./s3Handler");
const sharp = require("sharp");
const process = async event => {
  const { size, image } = event.pathParameters;
  return await resize(size, image);
};
const resize = async (size, path) => {
  try {
    const sizes = size.split("x");
    const width = parseInt(sizes[0]);
    const height = parseInt(sizes[1]);
    const key = path;
    const newKey = `${width}x${height}/${path}`;
    const Bucket = process.env.BUCKET;
    const streamResize = sharp()
      .resize(width, height)
      .toFormat("png");
    const readStream = s3Helper.readStream({ Bucket, key });
    const { writeStream, uploaded } = s3Handler.writeStream({
      Bucket,
      Key: newKey
    });

    readStream.pipe(streamResize).pipe(writeStream);

    await uploaded;
    return newKey;
  } catch (err) {
    console.log(err);
    throw new Error(err);
  }
};
module.exports = {
  process
};
