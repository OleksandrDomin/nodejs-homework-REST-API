const Jimp = require("jimp");

const resizeAvatar = async (req, res, next) => {
  const { path: tmpUpload } = req.file;
  // Read the image.
  const image = await Jimp.read(tmpUpload);
  // Resize the image to width 250 and heigth 250.
  image.resize(250, 250);
  // Save and overwrite the image
  await image.writeAsync(tmpUpload);
  next();
};

module.exports = { resizeAvatar };
