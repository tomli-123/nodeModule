let {
  render,
  request,
  add,
  addRouter,
  removeRouter,
  Jump,
  Pquest,
} = require("./handle");

function router(res, req) {
  if (req.url === "/" || req.url === "/index.html") {
    render(res, req);
  } else if (req.url.startsWith("/assets")) {
    //   二次请求处理
    request(res, req);
  } else if (req.url === "/add.html") {
    //   添加页面
    add(res, req);
  } else if (req.url.startsWith("/fb" && req.method === "GET")) {
    //   添加路由
    addRouter(res, req);
  } else if (req.url.startsWith("/delete")) {
    //   删除路由
    removeRouter(res, req);
  } else if (req.url === "/add") {
    Jump(res);
  } else if (req.url.startsWith("/fb") && req.method === "POST") {
    // POST请求
    Pquest(req, res);
  }
}

module.exports = router;
