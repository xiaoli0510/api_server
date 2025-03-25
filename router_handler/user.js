const db = require("../db/index.js");
//加密
const bcrypt = require("bcryptjs");

exports.regUser = (req, res) => {
  const userinfo = req.body;
  // if (!userinfo.username || !userinfo.password) {
  //   return res.cc('用户名或者密码不能为空')
  // }
  userinfo.password = bcrypt.hashSync(userinfo.password, 10);

  const sql = "SELECT * FROM ev_users WHERE username = ?";
  db.query(sql, [userinfo.username], (err, results) => {
    if (err) {
      return res.cc(err);
    }
    if (results.length > 0) {
      return res.cc("用户名已经存在");
    }

    const sql1 = "INSERT INTO ev_users SET ?";
    db.query(
      sql1,
      { username: userinfo.username, password: userinfo.password },
      (err, results) => {
        if (err) {
          return res.cc(err);
        }
        if (results.affectedRows !== 1) {
          return res.cc("注册失败");
        }
        res.cc("注册成功",0);
      }
    );
  });
};

exports.login = (req, res) => {
  res.send("login ok");
};
