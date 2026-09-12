const path = require("path");
const fs = require("fs");

function RandomNumberGenerator() {
  return Math.floor(Math.random() * 900000 + 100000);
}

function deleteInvalidPropertyInObject(data = {}, blackListFields = []) {
  let nullishData = ["", " ", "0", 0, false, null, undefined];
  Object.keys(data).forEach((key) => {
    if (blackListFields.includes(key)) delete data[key];
    if (typeof data[key] === "string") data[key] = data[key].trim();
    if (nullishData.includes(key)) delete data[key];
    if (Array.isArray(data[key]) && data[key].length > 0)
      data[key] = data[key].map((item) => item.trim());
    if (Array.isArray(data[key]) && data[key].length == 0) delete data[key];
  });
}

function copyObject(object) {
  return JSON.parse(JSON.stringify(object));
}

function deleteFileInPublic(fileAddress) {
  if (fileAddress) {
    const pathFile = path.join(__dirname, "..", "..", "public", fileAddress);
    if (fs.existsSync(pathFile)) {
      fs.unlinkSync(pathFile);
    } else {
      return false;
    }
  }
}

function getTime(seconds) {
  let total = Math.round(seconds) / 60;
  let [minutes, percent] = String(total).split(".");
  let second = Math.round((percent * 60) / 100)
    .toString()
    .substring(0, 2);
  let houre = 0;
  if (minutes > 60) {
    total = minutes / 60;
    let [h1, percent] = String(total).split(".");
    houre = h1;
    minutes = Math.round((percent * 60) / 100)
      .toString()
      .substring(0, 2);
  }
  if (String(houre).length == 1) houre = `0${houre}`;
  if (String(minutes).length == 1) minutes = `0${minutes}`;
  if (String(second).length == 1) second = `0${second}`;

  return houre + ":" + minutes + ":" + second;
}

function getTimeOfCourse(chapters = []) {
  let time,
    houre,
    minutes,
    second = 0;
  for (const chapter of chapters) {
    if (Array.isArray(chapter?.episodes)) {
      for (const episode of chapter?.episodes) {
        if (episode?.time) {
          time = episode.time.split(":");
        } else {
          time = "00:00:00".split(":");
        }
        if (time.length == 3) {
          second += Number(time[0]) * 3600; //convert houre to second
          second += Number(time[1]) * 60; //convert minute to second
          second += Number(time[2]); //is time second
        } else if (time.length == 2) {
          //05:30
          second += Number(time[0]) * 60; //convert minute to second
          second += Number(time[1]); //is time second
        }
      }
    }
  }
  houre = Math.floor(second / 3600); //convert second to houre
  minutes = Math.floor(second / 60) % 60; //convert second to minutes
  second = Math.floor(second % 60); //convert and rounded second to second

  if (String(houre).length == 1) houre = `0${houre}`;
  if (String(minutes).length == 1) minutes = `0${minutes}`;
  if (String(second).length == 1) second = `0${second}`;
  return houre + ":" + minutes + ":" + second;
}

function ListOfImagesFromRequests(files, fileUploadPath) {
  if (files?.length > 0) {
    return files
      .map((file) => path.join(fileUploadPath, file?.filename))
      .map((item) => item.replace(/\\/g, "/"));
  } else {
    return [];
  }
}

function setFeatures(body) {
  const { colors, width, height, weight, length } = body;
  let features = {};
  if (width || weight || height || length) {
    if (!width) features.width = 0;
    else features.width = width;
    if (!height) features.height = 0;
    else features.height = height;
    if (!weight) features.weight = 0;
    else features.weight = weight;
    if (!length) features.length = 0;
    else features.length = length;
    if (!colors) features.colors = [];
    else features.colors = colors;
  }
  return features;
}

module.exports = {
  RandomNumberGenerator,
  deleteInvalidPropertyInObject,
  copyObject,
  getTimeOfCourse,
  getTime,
  deleteFileInPublic,
  ListOfImagesFromRequests,
  setFeatures,
};
