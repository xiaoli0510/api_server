const bcrypt = require("bcryptjs/dist/bcrypt.js");
const db = require("../db/index.js");
const { result } = require("@hapi/joi/lib/base.js");

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
  const userinfo = req.body;
  const str1 = `select username from ev_users where id = ?`;
  db.query(str1, req.user.id, (err, results) => {
    console.log(err, results);
    if (err) return res.cc(err.message);
    if (results.length !== 1) return res.cc("用户不存在");
    const str = `update ev_users set nickname = ?,email = ? where id = ?`;
    db.query(
      str,
      [userinfo.nickname, userinfo.email, req.user.id],
      (err, results) => {
        if (err) return res.cc(err.message);
        if (results.affectedRows !== 1) return res.cc("更新失败");
        res.send({
          status: 0,
          msg: "更新成功",
        });
      }
    );
  });
};

exports.updatePassword = (req, res) => {
  const userinfo = req.body;
  const str = `select password from ev_users where id = ?`;
  db.query(str, [req.user.id], (err, results) => {
    if (err) return res.cc(err.message);
    if (results.length !== 1) return res.cc("用户不存在");
    if (!bcrypt.compareSync(userinfo.oldPwd, results[0].password))
      return res.cc("旧密码不正确");
    const newPwd = bcrypt.hashSync(userinfo.newPwd, 10);
    const str1 = `update ev_users set password = ? where id = ?`;
    db.query(str1, [newPwd, req.user.id], (err, results) => {
      if (err) return res.cc(err.message);
      if (results.affectedRows !== 1) return res.cc("更新密码失败");
      res.send({
        status: 0,
        msg: "更新密码成功",
      });
    });
  });
};

exports.updateAvatar = (req, res) => {
  const str = `select username from ev_users where id = ?`;
  db.query(str, req.user.id, (err, results) => {
    if (err) return res.cc(err.message);
    if (results.length !== 1) return res.cc("用户不存在");
    const str1 = `update ev_users set user_pic = ? where id = ?`;
    db.query(str1, [req.body.avatar, req.user.id], (err, results) => {
      if (err) return res.cc(err.message);
      if (results.affectedRows !== 1) return res.cc("更新用户头像失败");
      res.send({
        status: 0,
        msg: '更新用户头像成功'
      })
    });
  });
};
