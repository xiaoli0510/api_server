const db = require("../db");

exports.addArticle = (req, res) => {
  const str = "insert into ev_articles set ?";
  db.query(str, req.body, (err, results) => {
    if (err) return res.cc(err.message);
    if (results.affectedRows !== 1) return res.cc("新增失败");
    res.send({
      status: 0,
      msg: "新增成功",
    });
  });
};

exports.getArticle = (req, res) => {
  const str = "select * from ev_articles where is_delete = ?";
  db.query(str, [0], (err, results) => {
    if (err) return res.cc(err.message);
    if (results.length <= 1) return res.cc("获取失败");
    res.send({
      status: 0,
      msg: "查询成功",
      data: results,
    });
  });
};

exports.deleteArticle = (req, res) => {
  const str = `update ev_articles set is_delete = 1 where id = ?`;
  db.query(str, [req.body.id], (err, results) => {
    if (err) return res.cc(err.message);
    if (results.affectedRows !== 1) return res.cc("删除失败");
    res.send({
      status: 0,
      msg: "删除成功",
    });
  });
};

exports.updateArticle = (req, res) => {
  const str = `update ev_articles set ? where id = ?`;
  db.query(str, [req.body, req.body.id], (err, results) => {
    if (err) return res.cc(err.message);
    if (results.affectedRows !== 1) return res.cc("更新失败");
    res.send({
      status: 0,
      msg: "更新成功",
    });
  });
};
