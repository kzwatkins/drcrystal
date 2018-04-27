var Book      = require("../models/book");
var Middleware      = require("../middleware");

var express = require("express");
var router = express.Router();

router.get("/", function(req, res){
  res.render("books");
});

router.get("/new", Middleware.isLoggedIn, function(req, res){
  res.render("books/new", {currentUser: req.user});
});

router.post("/", Middleware.isLoggedIn, function(req, res){
  res.redirect("/books");
});

router.get("/:id", Middleware.isLoggedIn, function(req, res){
  console.log(req.params);
  BookFxns.findBookByID(req.params.id, req, res);
});

// EDIT
router.get("/:id/edit", Middleware.isBookOwner, function(req, res){
  Book.findById(req.params.id, function(err, book){
    if(err){
      console.error("Error trying to find book when trying to edit: " + err);
      return res.redirect("back");
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
      return res.redirect("/books/"+id);
    }

    res.redirect("/books"+"/" + id);
  });
});

router.delete("/:id", Middleware.isBookOwner, function(req, res){
  var id = req.params.id;

  Book.findById(req.params.id, function(err, book){
    if(err){
      console.error("Error in finding book: " + err);
      return res.redirect("/books");
    }

    Book.remove({_id:id}, function(err){
      if(err){
        console.error("Error attempting to delete book: " + err);
        return res.redirect("/books");
      }
    });

    res.redirect("/books");
  });
});

module.exports = router;
