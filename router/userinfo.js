const express = require('express');
const userinfo_handler = require('../router_handler/userinfo');

const router = express.Router(); // 修复：使用 express.Router()
const {update_userinfo_schema,update_pwd_schema} = require('../schema/user');
const expressJoi = require('@escook/express-joi');

// 获取用户信息
router.get('/userinfo', userinfo_handler.getUserInfo); // 修复：调用正确的处理函数

//更新用户信息
router.post('/userinfo',expressJoi(update_userinfo_schema), userinfo_handler.updateUserInfo); // 修复：调用正确的处理函数

//更新用户密码
router.post('/updatepwd', expressJoi(update_pwd_schema), userinfo_handler.updatePassword)



module.exports = router;