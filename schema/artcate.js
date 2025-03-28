const joi = require("joi");

const name = joi.string().required()
const alias = joi.string().alphanum().required()
const id = joi.number().integer().min(1).required()

//添加文章的规则验证
exports.add_cate_schema = {
    body: {
        name,
        alias,
    }
}

//根据id删除cate的规则验证
exports.delete_cate_schema = {
    params: {
        id
    }
}
//根据id获取cate的规则验证
exports.get_cate_schema = {
    params: {
        id
    }
}
//更新cate的规则验证
exports.update_cate_schema = {
    body: {
        name,
        alias,
        id,
    }
}