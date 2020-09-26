let mime = require("mime");
let fs = require("fs");
let path = require("path");
const artTemplate = require("art-template");
let url = require("url");
let moment = require("moment");
let querystring = require("querystring");
let { dataRead, dataWrite } = require("./tools");
// 渲染首页
function render(res, req) {
  //   首页的渲染
  res.setHeader("content-type", mime.getType(req.url));
  dataRead((err, data) => {
    if (err) return console.log("文件读取失败");
    let da = JSON.parse(data);
    let htmlStr = artTemplate(path.join(__dirname, "./views/index.html"), {
      data: da,
    });
    res.end(htmlStr);
  });
}
// 二次请求
function request(res, req) {
  res.setHeader("content-type", mime.getType(req.url));
  fs.readFile(path.join(__dirname, req.url), (err, data) => {
    if (err) return console.log("文件读取失败");
    res.end(data);
  });
}
// 添加页面
function add(res, req) {
  res.setHeader("content-type", mime.getType(req.url));
  fs.readFile(path.join(__dirname, "./views/add.html"), (err, data) => {
    if (err) return console.log("文件读取失败");
    res.end(data);
  });
}
// 添加路由
function addRouter(res, req) {
  let obj = {};
  dataRead((err, data) => {
    if (err) return console.log("文件读取失败");
    obj.id = Date.now();
    obj.time = "2020";
    data = JSON.parse(data);
    url = url.parse(req.url, true);
    obj.name = url.query.name;
    obj.title = url.query.title;
    obj.content = url.query.content;
    data.unshift(obj);
    dataWrite(data);
    res.redirect(res);
  });
}
// 删除路由
function removeRouter(res, req) {
  dataRead((err, data) => {
    if (err) return console.log("文件读取失败");
    data = JSON.parse(data);
    url = url.parse(req.url, true);
    //   console.log(url.query.id);
    arr = data.filter((item) => {
      return item.id != url.query.id;
    });
    dataWrite(arr);
  });
  res.redirect(res);
}
// 跳转页面
function Jump(res) {
  res.statusCode = 302;
  res.setHeader("location", "/add.html");
  res.end();
}
// POST请求
function Pquest(req, res) {
  // fs.readFile(path.join(__dirname, "./data.json"), "utf8", (err, data) => {
  //   let obj = {};
  //   let str = "";
  //   if (err) return console.log("文件读取失败");
  //   data = JSON.parse(data);

  //   req.on("data", (chuck) => {
  //     str += chuck;
  //   });
  //   req.on("end", () => {
  //     obj = querystring.parse(str);
  //     obj.id = Date.now();
  //     obj.time = moment(new Date()).format("MMMM Do YYYY, h:mm:ss a");
  //     data.unshift(obj);
  //     data = JSON.stringify(data);
  //     fs.writeFile(path.join(__dirname, "./data.json"), data, (err) => {
  //       res.statusCode = 302;
  //       res.setHeader("location", "/");
  //       res.end();
  //     });
  //   });
  // });
  dataRead((err, data) => {
    let obj = {};
    let str = "";
    if (err) return console.log("文件读取失败");
    data = data.toString();
    data = JSON.parse(data);
    req.on("data", (chuck) => {
      str += chuck;
    });
    req.on("end", () => {
      obj = querystring.parse(str);
      obj.id = Date.now();
      obj.time = moment(new Date()).format("MMMM Do YYYY, h:mm:ss a");
      data.unshift(obj);
      data = JSON.stringify(data);

      fs.writeFile(path.join(__dirname, "./data.json"), data, (err) => {
        res.statusCode = 302;
        res.setHeader("location", "/");
        res.end();
      });
    });
  });
}

module.exports = {
  render,
  request,
  add,
  addRouter,
  removeRouter,
  Jump,
  Pquest,
};
