const joi = require("joi");

const str = joi.string().required();
const id = joi.number().integer().min(1).required();
//新增验证规则
exports.add_article_schema = {
  body: {
    title: str,
    content: str,
    cover_img: str,
    pub_date: str,
    state: str,
    cate_id: id,
    author_id: id,
  },
};
//删除的验证规则
exports.delete_article_schema = {
  body: {
    id
  },
};

//update验证规则
exports.update_article_schema = {
  body: {
    id,
    title: str,
    content: str,
    cover_img: str,
    pub_date: str,
    state: str,
    cate_id: id,
    author_id: id,
  },
};
