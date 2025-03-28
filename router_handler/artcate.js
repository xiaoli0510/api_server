const db = require("../db");

//获取文章分类
exports.getArtCates = (req, res) => {
  const str = `select * from ev_article_cate where is_delete = 0 order by id asc`;
  db.query(str, (err, results) => {
    if (err) return res.cc(err.message);
    if (results.length === 0) return res.cc("没有数据");
    res.send({
      status: 0,
      msg: "查询成功",
      data: results,
    });
  });
};

//新增文章分类
exports.addArtCates = (req, res) => {
  const cateinfo = req.body;
  const str = `select * from ev_article_cate where name = ? or alias = ?`;
  db.query(str, [cateinfo.name, cateinfo.alias], (err, results) => {
    if (err) return res.cc(err.message);
    if (
      results.length === 2 ||
      (results.length === 1 &&
        results[0].name === cateinfo.name &&
        results[0].alias === cateinfo.alias)
    )
      return res.cc("类目名称和别名已经存在");
    if (results.length === 1 && results[0].name === cateinfo.name)
      return res.cc("类目名称已经存在");
    if (results.length === 1 && results[0].alias === cateinfo.alias)
      return res.cc("别名已经存在");
    const str1 = "insert into ev_article_cate set ?";
    db.query(str1, cateinfo, (err, results) => {
      if (err) return res.cc(err.message);
      if (results.affectedRows !== 1) return res.cc("新增失败");
      res.send({
        status: 0,
        msg: "新增成功",
      });
    });
  });
};

//删除文章分类
exports.deleteCateById = (req, res) => {
  const str = "update ev_article_cate set is_delete = 1 where id = ?";
  db.query(str, req.params.id, (err, results) => {
    if (err) return res.cc(err.message);
    if (results.affectedRows !== 1) return res.cc("删除失败");
    res.send({
      status: 0,
      msg: "删除成功",
    });
  });
};

//根据id获取文章分类
exports.getCateById = (req, res) => {
  const str = `select * from ev_article_cate where id = ?`;
  db.query(str, req.params.id, (err, results) => {
    if (err) return res.cc(err.message);
    if (results.length !== 1) return res.cc("id有误");
    res.send({
      status: 0,
      msg: "获取文章分类成功",
      data: results[0],
    });
  });
};
//更新文章分类
exports.updateCate = (req, res) => {
  const str1 = `select * from ev_article_cate where id <> ? and (name = ? or alias = ?)`;
  db.query(
    str1,
    [req.body.id, req.body.name, req.body.alias],
    (err, results) => {
      if (err) return res.cc(err.message);
      if (
        results.length === 2 ||
        (results.length === 1 &&
          results[0].name === req.body.name &&
          results[0].alias === req.body.alias)
      )
        return res.cc("name和alias被占用");
      if (results.length === 1 && results[0].name === req.body.name)
        return res.cc("name被占用");
      if (results.length === 1 && results[0].alias === req.body.alias)
        return res.cc("alias被占用");
      const str = `update ev_article_cate set ? where id = ?`;
      db.query(str, [req.body, req.body.id], (err, results) => {
        if (err) return res.cc(err.message);
        if (results.affectedRows !== 1) return res.cc("更新失败");
        res.send({
          status: 0,
          msg: "更新文章分类成功",
        });
      });
    }
  );

};
