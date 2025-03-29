const express = require("express");
const expressJoi = require("@escook/express-joi");
const {
  add_article_schema,
  delete_article_schema,
  update_article_schema,
} = require("../schema/article");
const {
  addArticle,
  deleteArticle,
  getArticle,
  updateArticle,
} = require("../router_handler/article");

const router = express();

router.post("/add", expressJoi(add_article_schema), addArticle);
router.post("/delete", expressJoi(delete_article_schema), deleteArticle);
router.get("/get/article", getArticle);
router.post(
  "/update/article",
  expressJoi(update_article_schema),
  updateArticle
);

getArticle;
module.exports = router;
