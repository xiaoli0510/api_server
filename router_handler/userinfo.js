const bcrypt = require("bcryptjs/dist/bcrypt.js");
const db = require("../db/index.js");

exports.getUserInfo = (req, res) => {
  const str = `select id, username from ev_users where id = ?`;
  db.query(str, req.user.id, (err, results) => {
    if (err) return res.cc(err.message);
    if (results.length !== 1) return res.cc("查询失败");
    res.send({
      status: 0,
      msg: "查询成功",
      data: results[0],
    });
  });
};

exports.updateUserInfo = (req, res) => {
  const str = `update ev_users set ? where id = ?`;
  db.query(str, [req.body, req.body.id], (err, results) => {
    if (err) return res.cc(err.message);
    if (results.affectedRows !== 1) return res.cc("更新失败");
    res.send({
      status: 0,
      msg: "更新成功",
    });
  });
};

exports.updatePassword = (req, res) => {
  const str = `select password from ev_users where id = ?`;
  db.query(str, req.user.id, (err, results) => {
    if (err) return res.cc(err.message);
    if (results.length !== 1) return res.css("用户名不存在");
    if (!bcrypt.compareSync(req.body.oldPwd, results[0].password))
      return res.cc("旧密码不正确");
    const str1 = `update ev_users set password=? where id = ?`;
    const password = bcrypt.hashSync(req.body.newPwd, 10);
    db.query(str1, [password, req.user.id], (err, results) => {
      console.log("results", results);
      if (err) return res.cc(err.message);
      if (results.affectedRows !== 1) return res.cc("更新失败");
      res.send({
        status: 0,
        msg: "更新成功",
      });
    });
  });
};
