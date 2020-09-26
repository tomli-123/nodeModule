// 挂载
function mount(res) {
  res.redirect = (res) => {
    res.statusCode = 302;
    res.setHeader("location", "/");
    res.end();
  };
}
module.exports = mount;
