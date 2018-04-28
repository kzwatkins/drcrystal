var Generics = require("../generics");
var User = require("./user");
var mongoose = require(Generics.MONGOOSE);
var Time = require("./time");

const MODEL_NAME = "Book";

const BLUEPRINT = {
  title: String,
  year: String,
  publisher: String,
  url: String,
  desc: String,
  price: String,
  author: User.REF,
  createdAt: Time.REF
};

var exports = module.exports = Generics.createModel(MODEL_NAME, BLUEPRINT);
exports.REF = Generics.createRef(MODEL_NAME);
