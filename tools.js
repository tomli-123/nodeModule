// 封装
let fs = require("fs");
let path = require("path");
let pathUrl = path.join(__dirname, "data.json");
let arr = [];
// 读文件
function dataRead(cb) {
  fs.readFile(pathUrl, (err, data) => {
    cb(err, data);
  });
}
// 写文件
function dataWrite(arr) {
  fs.writeFile(
    path.join(__dirname, "data.json"),
    JSON.stringify(arr, null, 2),
    (err) => {
      if (err) return console.log("写文件失败");
    }
  );
}

module.exports = {
  dataRead,
  dataWrite,
};
