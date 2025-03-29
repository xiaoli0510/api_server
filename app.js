const express = require("express");
const cors = require("cors");
const userRouter = require("./router/user.js");
const userinfoRouter = require("./router/userinfo.js");
const artcateRouter = require('./router/artcate.js')
const articleRouter = require('./router/article.js')
const joi = require("joi");
//解析token
const expressJWT = require("express-jwt");
const config = require("./config.js");

const app = express();
app.use(cors());
//配置解析application/x-www-from-urlencoded格式的表单数据的中间件
app.use(express.urlencoded({ extended: false }));
//封装全局中间件去处理res.send错误消息，需在注册解析token之前注册，
app.use((req, res, next) => {
  res.cc = (err, status = 1) => {
    res.send({
      status,
      msg: err instanceof Error ? err.message : err,
    });
  };
  next();
});

//注册解析token的中间件，去除api请求中以/api/开头的路径请求
app.use(
  expressJWT({
    secret: config.jwtSecretKey, // 确保密钥与生成 token 时一致
  }).unless({ path: [/^\/api/] })
);
app.use("/api", userRouter);
app.use("/my", userinfoRouter);
app.use("/my/article", artcateRouter);
app.use("/my/essay", articleRouter);

app.post('/ab',(req, res) => {
  res.send({
      status: 0,
      msg: 'ok'
  })
})

//定义全局中间件，捕获验证错误
app.use((err, req, res, next) => {
  if (err instanceof joi.ValidationError) {
    return res.cc(err.message);
  }
  if (err.name === "UnauthorizedError") return res.cc('身份验证失败');
  return res.cc(err);
});

app.listen(3007, () => {
  console.log('http://127.0.0.1:3007');
});
