const express = require("express");
const cors = require("cors");
const userRouter = require("./router/user.js");
const joi = require("joi");
const app = express();
app.use(cors());
//配置解析application/x-www-from-urlencoded格式的表单数据的中间件
app.use(express.urlencoded({ extended: false }));

//封装中间件去处理res.send错误消息
app.use((req, res, next) => {
  res.cc = (err, status = 1) => {
    res.send({
      status,
      msg: err instanceof Error ? err.message : err,
    });
  };
  next();
});
app.use("/api", userRouter);

//定义全局中间件，捕获验证错误
app.use((err, req, res, next) => {
  if (err instanceof joi.ValidationError) {
    return res.cc(err.message);
  }
  return res.cc(err);
});

app.listen(3007, () => {
  console.log('http://127.0.0.1"3007');
});
