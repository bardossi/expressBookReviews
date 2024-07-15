const express = require('express');
let books = require("./booksdb.js");
let isValid = require("./auth_users.js").isValid;
let users = require("./auth_users.js").users;
const public_users = express.Router();

public_users.post("/register", (req, res) => {
  //Write your code here
  const username = req.body.username;
  const password = req.body.password;

  if (username && password) {
    // Check if the user does not already exist
    if (!doesExist(username)) {
      // Add the new user to the users array
      users.push({ "username": username, "password": password });
      return res.status(200).json({ message: "User successfully registered. Now you can login" });
    } else {
      return res.status(404).json({ message: "User already exists!" });
    }
  }
  // Return error if username or password is missing
  return res.status(404).json({ message: "Unable to register user." });
});

const doesExist = (username) => {
  // Filter the users array for any user with the same username
  let userswithsamename = users.filter((user) => {
    return user.username === username;
  });
  // Return true if any user with the same username is found, otherwise false
  if (userswithsamename.length > 0) {
    return true;
  } else {
    return false;
  }
}

// Get the book list available in the shop
public_users.get('/', async function (req, res) {
  //Write your code here
  res.send(books);
});

// Get book details based on ISBN
public_users.get('/isbn/:isbn', function (req, res) {
  const isbn = req.params.isbn;

  new Promise((resolve, reject) => {
    const bookByIsbn = books[isbn];
    if (bookByIsbn) {
      resolve(bookByIsbn);
    } else {
      reject({ message: "Book not found" });
    }
  })
    .then(book => {
      res.status(200).json(book);
    })
    .catch(err => {
      res.status(404).json(err);
    });
});


// Get book details based on author
async function fetchBooksByAuthor(author) {
  return new Promise((resolve) => {
    setTimeout(() => {
      let bookByAuthor = [];
      for (let key in books) {
        if (books[key].author === author) {
          bookByAuthor.push(books[key]);
        }
      }
      resolve(bookByAuthor);
    }, 1000); // Simulating a delay
  });
}

public_users.get('/author/:author', async function (req, res) {
  //Write your code here
  const author = req.params.author;
  const bookByAuthor = await fetchBooksByAuthor(author);

  if (bookByAuthor.length > 0) {
    return res.status(200).json(bookByAuthor);
  } else {
    return res.status(404).json({ message: "Book not found" });
  }
});

// Get all books based on title
async function fetchBooksByTitle(title) {
  return new Promise((resolve) => {
    setTimeout(() => {
      let bookByTitle = [];
      for (let key in books) {
        if (books[key].title === title) {
          bookByTitle.push(books[key]);
        }
      }
      resolve(bookByTitle);
    }, 1000); // Simulating a delay
  });
}

public_users.get('/title/:title', async function (req, res) {
  //Write your code here
  const title = req.params.title;
  const bookByTitle = await fetchBooksByTitle(title);

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
  const book = books[isbn];

  if (book) {
    const reviews = book.reviews || {};
    return res.status(200).json(reviews);
  } else {
    return res.status(404).json({ message: "Book not found" });
  }

});

module.exports.general = public_users;
