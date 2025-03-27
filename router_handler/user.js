const bcryptjs = require("bcryptjs");
const config = require("../config.js");
const db = require("../db/index.js");

const bcrypt = require("bcryptjs");

const jwt = require("jsonwebtoken");

exports.regUser = (req, res) => {
  const userinfo = req.body;
  const sql = `select username from ev_users where username = ?`;
  db.query(sql, userinfo.username, (err, results) => {
    if (err) return res.cc(err.message);
    if (results.length === 1) return res.cc("用户名已经存在");
    const password = bcrypt.hashSync(userinfo.password, 10);
    const str1 = "insert into ev_users (username,password) values (?,?)";
    db.query(str1, [userinfo.username,password], (err, results) => {
      if (err) return res.cc("注册失败");
      if (results.affectedRows === 1) {
        res.send({
          status: 0,
          msg: "注册成功",
        });
      }
    });
  });
};

exports.login = (req, res) => {
  const userinfo = req.body;
  const str = `select id,username,password from ev_users where username = ?`;
  db.query(str, userinfo.username, (err, results) => {
    if (err) return res.cc(err.message);
    if (results.length !== 1) return res.cc("用户名不存在");
    if (!bcrypt.compareSync(userinfo.password, results[0].password))
      return res.cc("密码错误");
    console.log({ id: results[0].id })
    const token = jwt.sign(
      { id: results[0].id }, // 将用户 id 放入 token 的 payload
      config.jwtSecretKey, // 确保密钥与解析时一致
      { expiresIn: config.expiresIn } // 设置 token 过期时间
    );
    res.send({
      status: 0,
      msg: "登录成功",
      token: `Bearer ${token}`,
    });
  });
};
