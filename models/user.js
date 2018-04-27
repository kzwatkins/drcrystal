const Generics              = require("../generics");

const mongoose              = require (Generics.MONGOOSE);
var passportLocalMongoose   = require("passport-local-mongoose");
var Time                    = require("./time");

const MODEL_NAME = "User";

const BLUEPRINT = {
  username: String,
  password: String,
  createdBy: Time.REF
};

var Schema = Generics.createSchema(BLUEPRINT); // new mongoose.Schema(BLUEPRINT);
Schema.plugin(passportLocalMongoose);
var User = mongoose.model(MODEL_NAME, Schema);

function createUser(username, password){
  var user = {
    username: username,
    password: password
  }

  return new User(user);
}

var exports = module.exports = User;
exports.REF = Generics.createRef(MODEL_NAME);
exports.createUser = createUser;
