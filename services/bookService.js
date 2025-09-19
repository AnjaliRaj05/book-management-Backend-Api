// services/bookService.js
const Book = require('../models/Book');

// Get all books with filters and pagination
exports.getAllBooksService = async (filters = {}, page = 1, limit = 10) => {
  const books = await Book.find(filters)
    .skip((page - 1) * limit)
    .limit(parseInt(limit))
    .lean();

  const totalBooks = await Book.countDocuments(filters);

  return { books, totalBooks };
};

// Get book by ID
exports.getBookByIdService = async (id) => {
  return await Book.findById(id).lean();
};

// Create a new book
exports.createBookService = async (data) => {
  const exists = await Book.findOne({ title: data.title, author: data.author });
  if (exists) throw new Error('exists');

  if (!data.status) data.status = 'Available'; // default status
  return await Book.create(data);
};

// Edit/update a book
exports.editBookService = async (id, data) => {
  const updatedBook = await Book.findByIdAndUpdate(id, data, { new: true });
  return updatedBook;
};

// Delete a book
exports.deleteBookService = async (id) => {
  const deletedBook = await Book.findByIdAndDelete(id);
  return deletedBook;
};

// Upload book cover
exports.uploadBookCoverService = async (id, filename) => {
  const updatedBook = await Book.findByIdAndUpdate(
    id,
    { coverImage: filename },
    { new: true }
  );
  return updatedBook;
};
