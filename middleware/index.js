var Generics = require("../generics");
var Book = require("../models/book");

var middleware = {
  isLoggedIn: function (req, res, next){
    if(!req.isAuthenticated()){
      req.flash(Generics.ERROR, "Please login first");
      return res.redirect(Generics.LOGIN_ROUTE);
    }

    next();
  },

  isBookOwner: function (req, res, next){
    if(!req.isAuthenticated()){
        req.flash(Generics.ERROR, "Sorry, you have to be logged in to do that.");
        return res.redirect(Generics.BACK);
    }

    var id = req.params.id;

    Book.findById(id, function(err, book){
      if(err){
        req.flash(Generics.ERROR, err.message);
        return res.redirect(Generics.BACK);
      }

      var userId = req.user._id;

      if(!book.author.id.equals(userId)) {
        req.flash(Generics.ERROR, "You don't own that book.");
        return res.redirect(Generics.BOOKS_ROUTE);
      }

      next();
    });
  }
};

module.exports = middleware;
