var Generics        = require("./generics");
var EXPRESS_SESSION_CREDS = Generics.EXPRESS_SESSION_CREDS;

var express         = require(Generics.EXPRESS),
    mongoose        = require(Generics.MONGOOSE),
    flash           = require("connect-flash"),
    moment          = require("moment"),
    passport        = require("passport"),
    LocalStrategy   = require("passport-local"),
    expressSession  = require("express-session"),
    ejs             = require("ejs"),
    bodyParser      = require("body-parser"),
    methodOverride  = require("method-override"),
    Book            = require("./models/book"),
    User            = require("./models/user"),
    app             = express();

var bookRoutes      = require("./routes/books"),
    authRoutes      = require("./routes");

init();

function initRoutes(){
  app.use(authRoutes);
  app.use(Generics.BOOKS_ROUTE, bookRoutes);
}

function init(){
  initSettings();
  initDB();
  initPassport();
  app.use(getLocals);
  initRoutes();
}

function initSettings(){
  app.use("/static", express.static(__dirname + "/public"));
  app.use(bodyParser.urlencoded({extended: true}));
  app.use(expressSession(EXPRESS_SESSION_CREDS));
  app.use(methodOverride("_method"));
  app.use(flash());
  app.set("view engine", "ejs");
}

function initPassport(){
  app.use(passport.initialize());
  app.use(passport.session());
  passport.use(new LocalStrategy(User.authenticate()));
  passport.serializeUser(User.serializeUser());
  passport.deserializeUser(User.deserializeUser());

}

function initDB(){
  mongoose.connect(process.env.DB_BOOKS || "mongodb://localhost/drcbooks");
}

function getLocals(req, res, next){
  res.locals.currentUser = req.user;
  res.locals.error = req.flash(Generics.ERROR);
  res.locals.success = req.flash(Generics.SUCCESS);
  app.locals.moment = moment;

  next();
}

app.get("*", function(req, res){
  res.send("Sorry there was a problem with your request!");
});

app.listen(process.env.PORT || 8000, process.env.IP || "0.0.0.0", function(){
  console.log("Dr. Crystal's Book Server Started.");
});
