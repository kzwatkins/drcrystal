var Generics    = require("../generics");
var Middleware  = require("../middleware");
var User        = require("../models/user"),
    Book        = require("../models/book");

var passport    = require(Generics.PASSPORT),
    express     = require(Generics.EXPRESS);


const LOGIN_ROUTE = Generics.LOGIN_ROUTE,
      LOGOUT_ROUTE = Generics.LOGOUT_ROUTE,
      BOOKS_ROUTE = Generics.BOOKS_ROUTE,
      LANDING_ROUTE = Generics.LANDING_ROUTE,
      SIGNUP_ROUTE = Generics.SIGNUP_ROUTE,
      BACK = Generics.BACK;

var router = express.Router();

const REDIRECTION = {
  successRedirect: BOOKS_ROUTE,
  failureRedirect: LOGIN_ROUTE,
  failureFlash: true
};

router.get("/", function(req, res){
  res.render("landing");
});

router.get(LOGIN_ROUTE, function(req, res){
  res.render("login");
});

router.post(LOGIN_ROUTE, auth("local"), function(req, res){
    req.flash("success", "You have successfully logged in, " + req.body.username);
    res.redirect(BOOKS_ROUTE);
});

function auth(type){
  return passport.authenticate(type, REDIRECTION);
}

router.get(SIGNUP_ROUTE, function(req, res){
  res.render("register");
});

router.post(SIGNUP_ROUTE, function(req, res){
  var user = new User({username: req.body.username});
  User.register(user, req.body.password, function(err, user){
    if(err){
       req.flash("error", err.message);
       return res.redirect(BACK);
    }

    passport.authenticate("local")(req, res, function(){
      req.flash("success", "You have successfully registered, " + req.user.username);
      res.redirect(BOOKS_ROUTE);
    });
  });
});

router.get(LOGOUT_ROUTE, function(req, res){
  req.logout();

  req.flash("success", "You have successfully logged out.");
  res.redirect(BOOKS_ROUTE);
});

module.exports = router;
