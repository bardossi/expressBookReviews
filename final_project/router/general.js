const express = require('express');
let books = require("./booksdb.js");
let isValid = require("./auth_users.js").isValid;
let users = require("./auth_users.js").users;
const public_users = express.Router();

public_users.post("/register", (req, res) => {
  //Write your code here
  return res.status(300).json({ message: "Yet to be implemented" });
});

// Get the book list available in the shop
public_users.get('/', function (req, res) {
  //Write your code here
  res.send(JSON.stringify(books));
});

// Get book details based on ISBN
public_users.get('/isbn/:isbn', function (req, res) {
  //Write your code here
  const isbn = req.params.isbn;
  let bookByIsbn = null;

  for (key in books) {
    if (books[key].isbn === isbn) {
      bookByIsbn = books[key];
      break;
    }
  }
  if (bookByIsbn) {
    return res.status(200).json(bookByIsbn);
  } else {
    return res.status(404).json({ message: "Book not found" });
  }

});

// Get book details based on author
public_users.get('/author/:author', function (req, res) {
  //Write your code here
  const author = req.params.author;
  let bookByAuthor = [];

  for (key in books) {
    if (books[key].author === author) {
      bookByAuthor.push(books[key]);
    }
  }
  if (bookByAuthor.length > 0) {
    return res.status(200).json(bookByAuthor);
  } else {
    return res.status(404).json({ message: "Book not found" });
  }
});

// Get all books based on title
public_users.get('/title/:title', function (req, res) {
  //Write your code here
  const title = req.params.title;
  let bookByTitle = [];

  for (key in books) {
    if (books[key].title === title) {
      bookByTitle.push(books[key]);
    }
  }
  if (bookByTitle.length > 0) {
    return res.status(200).json(bookByTitle);
  } else {
    return res.status(404).json({ message: "Book not found" });
  }
});

//  Get book review
public_users.get('/review/:isbn', function (req, res) {
  //Write your code here
  const isbn = req.params.isbn;
  let reviewByIsbn = null;

  for (key in books) {
    if (books[key].isbn === isbn) {
      reviewByIsbn = books[key]["reviews"];
    }
  }
  if (reviewByIsbn) {
    return res.status(200).json(reviewByIsbn);
  } else {
    return res.status(404).json({ message: "Book not found" });
  }

});

module.exports.general = public_users;
