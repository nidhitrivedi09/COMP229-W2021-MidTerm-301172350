/* books.js
 Nidhi Trivedi , 301172350 , 01/03/2021*/

//books router
// modules required for routing
let express = require("express");
let router = express.Router();
let mongoose = require("mongoose");

// define the book model
let book = require("../models/books");

/* GET books List page. READ */
router.get("/", (req, res, next) => {
  // find all books in the books collection
  book
    .find({})
    .sort("name")
    .exec(function (err, books) {
      if (err) {
        return console.error(err);
      } else {
        res.render("books/index", {
          title: "Books",
          books: books,
        });
      }
    });
});

//  GET the Book Details page in order to add a new Book
router.get("/add", (req, res, next) => {
  //show the add view
  res.render("books/add", {
    title: "Add a book",
  });
});

// POST process the Book Details page and create a new Book - CREATE
router.post("/add", (req, res, next) => {
  let newBook = book({
    Title: req.body.title,
    Price: req.body.price,
    Description:req.body.description,
    Author: req.body.author,
    Genre: req.body.genre,
  });

  book.create(newBook, (err, books) => {
    if (err) {
      console.log(err);
      res.end(err);
    } else {
      // refresh the Books List

      res.redirect("/books");
    }
  });
});

// GET the Book Details page in order to edit an existing Book
router.get("/edit/:id", (req, res, next) => {
  let id = req.params.id;

  book.findById(id, (err, BookToEdit) => {
    if (err) {
      console.log(err);
      res.end(err);
    } else {
      //show the edit view
      res.render("books/edit", {
        title: "Edit Book",
        books: BookToEdit,
      });
    }
  });
});

// POST - process the information passed from the details form and update the document
router.post("/edit/:id", (req, res, next) => {
  console.log("update entered");

  let id = req.params.id;
  console.log(id);
  let editBook = book({
    _id: req.params.id,
    Title: req.body.title,
    Author: req.body.author,
    Description: req.body.description,
    Price: req.body.price,
    Genre: req.body.genre,
  });

book.updateOne({ _id: id }, editBook, (err) => {
    console.log("test loop", id);
    if (err) {
      console.log(err);
      res.end(err);
    } else {
      console.log("success");
      // refresh the Book List
      res.redirect("/books");
    }
  });
});

// GET - process the delete by user id
router.get("/delete/:id", (req, res, next) => {

    console.log("delete entered");
    let id = req.params.id;
    book.deleteOne({ _id: id }, (err) => {
      if (err) {
        console.log(err);
        res.end(err);
      } else {
        // refresh the Book List
        res.redirect("/books");
      }
    });
});

module.exports = router;
