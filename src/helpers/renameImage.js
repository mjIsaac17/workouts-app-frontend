export const renameImage = (imageName = "") => {
  const imageParts = imageName.split(".");
  const extension = imageParts.pop();
  const newImageName = `${imageParts.join(".")}_${new Date()
    .getTime()
    .toString()}.${extension}`;
  return newImageName;
};
