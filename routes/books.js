var Book      = require("../models/book");
var Middleware      = require("../middleware");
var Generics = require("../generics");

var express = require("express");
var router = express.Router();

router.get("/", function(req, res){
  Book.find({}, function(err, books){
    if(err){
      req.flash(Generics.ERROR, err.message);
      return res.redirect("/");
    }

    req.flash(Generics.SUCCESS, "All info loaded successfully");
    res.render("books", {books: books});
  });
});

router.get("/new", Middleware.isLoggedIn, function(req, res){
  res.render("books/new", {currentUser: req.user});
});

router.post("/", Middleware.isLoggedIn, function(req, res){
  var book = req.body.book;

  Book.create(book, function(err, book){
    if(err){
      req.flash(Generics.ERROR, err.message);
      return res.redirect("/");
    }

    req.flash(Generics.SUCCESS, "Item added successfully: " + book);
    res.redirect(Generics.BOOKS_ROUTE);
  });

});

router.get("/:id", Middleware.isLoggedIn, function(req, res){
  var id = req.params.id;

  Book.findById(id, function(err, book){
    if(err){
      req.flash(Generics.ERROR, err.message);
      return res.redirect(Generics.BACK);
    }

    res.render("books/book", {book: book});
  });
});

// EDIT
router.get("/:id/edit", Middleware.isBookOwner, function(req, res){
  Book.findById(req.params.id, function(err, book){
    if(err){
      req.flash(Generics.ERROR, err.message);
      return res.redirect(Generics.BACK);
    }

    res.render("books/edit", {book: book});
  });
});

// UPDATE
router.put("/:id", Middleware.isBookOwner, function(req, res){
  var id = req.params.id;
  var book = req.body.book;

  Book.findByIdAndUpdate(id, book, function(err, foundBook){
    if(err){
      console.error("Error in updating book: " + err);
      return res.redirect(Generics.BOOKS_ROUTE+"/" + id);
    }

    res.redirect(Generics.BOOKS_ROUTE+"/" + id);
  });
});

router.delete("/:id", Middleware.isBookOwner, function(req, res){
  var id = req.params.id;

  Book.findById(req.params.id, function(err, book){
    if(err){
      console.error("Error in finding book: " + err);
      return res.redirect(Generics.BOOKS_ROUTE);
    }

    Book.remove({_id:id}, function(err){
      if(err){
        console.error("Error attempting to delete book: " + err);
        return res.redirect(Generics.BOOKS_ROUTE);
      }

      res.redirect(Generics.BOOKS_ROUTE);
    });
  });
});

module.exports = router;
