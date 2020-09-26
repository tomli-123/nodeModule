let http = require("http");
let router = require("./router");
let mount = require("./mount");
// 创建服务器
let server = http.createServer();
// 开启服务器
server.listen(8001, () => {
  console.log("服务器开启成功");
});
// 监听请求（路由处理）
server.on("request", (req, res) => {
  mount(res);
  router(res, req);
});
