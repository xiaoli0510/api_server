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
