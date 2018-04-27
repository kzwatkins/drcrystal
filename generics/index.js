const EXPRESS_SESSION_CREDS = {
  secret: process.env.SECRET || "Th!5!$@53cR3t", // The second is for testing only!
  resave: false,
  saveUninitialized: false
};

const LOGIN_ROUTE = "/login";
const LOGOUT_ROUTE = "/logout";
const BOOKS_ROUTE = "/books";
const POSTS_ROUTE = "/posts";
const SIGNUP_ROUTE = "/register";

const BACK = "back";
const ERROR = "error";
const SUCCESS = "success";

const MONGOOSE = "mongoose";
const EXPRESS = "express";
const PASSPORT = "passport";

var mongoose = require(MONGOOSE);

var Generics = {
  EXPRESS: EXPRESS,
  MONGOOSE: MONGOOSE,
  PASSPORT: PASSPORT,
  EXPRESS_SESSION_CREDS: EXPRESS_SESSION_CREDS,

  LOGIN_ROUTE: LOGIN_ROUTE,
  LOGOUT_ROUTE: LOGOUT_ROUTE,
  BOOKS_ROUTE: BOOKS_ROUTE,
  POSTS_ROUTE: POSTS_ROUTE,
  SIGNUP_ROUTE: SIGNUP_ROUTE,

  BACK: BACK,
  ERROR: ERROR,
  SUCCESS: SUCCESS,

  randNum : function(min, max){
    return Math.floor(Math.random() * (max-min));
  },

  createRef : function(modelName){
    var ref = {
        type: mongoose.Schema.Types.ObjectId,
        ref: modelName
    };

    return ref;
  },

  createSchema : function (blueprint){
    return new mongoose.Schema(blueprint);
  },

  createModel : function (modelName, blueprint){
    return mongoose.model(modelName, this.createSchema(blueprint));
  }
}

module.exports = Generics;
