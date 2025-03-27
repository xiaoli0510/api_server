const express = require('express');
const userinfo_handle = require('../router_handler/userinfo');

const router = express.Router(); // 修复：使用 express.Router()

// 绑定处理函数
router.get('/userinfo', userinfo_handle.getUserInfo); // 修复：调用正确的处理函数

module.exports = router;