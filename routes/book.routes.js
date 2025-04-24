const express = require("express");
const router = express.Router();
const Book = require("../model/book.model");

// 1. Create book
router.post("/", async (req, res) => {
  try {
    const book = new Book(req.body);
    await book.save();
    res.status(201).json(book);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

// 2. Get all books
router.get("/", async (req, res) => {
  try {
    const books = await Book.find();
    res.json(books);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// 3. Get book by title
router.get("/title/:title", async (req, res) => {
  try {
    const book = await Book.findOne({ title: req.params.title });
    if (!book) return res.status(404).json({ error: "Book does not exist" });
    res.json(book);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// 4. Get books by author
router.get("/author/:author", async (req, res) => {
  try {
    const books = await Book.find({ author: req.params.author });
    res.json(books);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// 5. Get books by genre
router.get("/genre/Business", async (req, res) => {
  try {
    const books = await Book.find({ genre: "Business" });
    res.json(books);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// 6. Get books by published year
router.get("/year/:year", async (req, res) => {
  try {
    const books = await Book.find({ publishedYear: req.params.year });
    res.json(books);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// 7. Update rating by ID
router.patch("/rating/id/:id", async (req, res) => {
  try {
    const book = await Book.findByIdAndUpdate(req.params.id, { rating: req.body.rating }, { new: true });
    if (!book) return res.status(404).json({ error: "Book does not exist" });
    res.json(book);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// 8. Update by title
router.patch("/update/title/:title", async (req, res) => {
  try {
    const book = await Book.findOneAndUpdate({ title: req.params.title }, req.body, { new: true });
    if (!book) return res.status(404).json({ error: "Book does not exist" });
    res.json(book);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// 9. Delete book by ID
router.delete("/:id", async (req, res) => {
  try {
    const book = await Book.findByIdAndDelete(req.params.id);
    if (!book) return res.status(404).json({ error: "Book not found" });
    res.json({ message: "Book deleted successfully" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

module.exports = router;
