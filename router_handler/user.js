const db = require("../db/index.js");
//加密
const bcrypt = require("bcryptjs");
const config = require('../config.js')
const jwt = require('jsonwebtoken')

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
        res.cc("注册成功", 0);
      }
    );
  });
};

exports.login = (req, res) => {
  console.log('login')
  //查询用户数据
  const userinfo = req.body;
  const sql = `SELECT * FROM ev_users WHERE username = ?`;
  db.query(sql, userinfo.username, (err, results) => {
    if (err) return res.cc(err);
    console.log('results',results)
    if (results.length !== 1) {
      return res.cc("用户名不存在");
    }
    //比较密码是否一致
    const compareResult = bcrypt.compareSync(userinfo.password, results[0].password)
    if(!compareResult) {
      return res.cc('用户名与密码不一致')
    }
    const user = {...results[0], password:'', user_pic: ''}
    const tokenStr = jwt.sign({
      data: 'foobar'
    }, config.jwtSecretKey, { expiresIn: config.expiresIn });
    res.send({
      status: 0,
      msg: 'login ok',
      token: `Bearer ${tokenStr}`
    })
  });
};
