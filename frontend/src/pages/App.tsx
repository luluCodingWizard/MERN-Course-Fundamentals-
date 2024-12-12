import axios from "axios";
import React, { useState, useEffect } from "react";
import BooksList from "../components/BooksList";
import BookDetails from "../components/BookDetails";
import { BookI } from "../types/Book";
import AddEditBookModal from "../components/AddEditBookModal";
import { getBooks } from "../api/bookService";
const App = () => {
  const [books, setBooks] = useState<BookI[]>([]); // for storing all books
  const [currentBook, setCurrentBook] = useState<BookI | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingBook, setEditingBook] = useState<BookI | null>(null);

  const fetchBooks = async () => {
    try {
      const response = await getBooks();
      setBooks(response);
    } catch (error) {
      console.error("Failed to fetch books:", error);
    }
  };

  useEffect(() => {
    fetchBooks();
  }, []);

  const handleAddBook = () => {
    setIsModalOpen(true);
    setEditingBook(null);
  };

  const onhandleDeleteBook = () => {
    console.log("deleting");
  };

  const onHandleEditBookSelection = (book: BookI) => {
    setEditingBook(book);
    setIsModalOpen(true);
  };
  return (
    <div className="min-h-screen bg-gray-100 p-5">
      <h1 className="text-2xl font-bold mb-4">Book Management App</h1>
      <button
        className="mb-4 px-4 py-2 bg-indigo-600 text-white rounded-md hover:bg-indigo-700"
        onClick={handleAddBook}
      >
        Add Book
      </button>
      <BooksList
        books={books}
        handleSetCurrentBook={setCurrentBook}
        handleEditBook={onHandleEditBookSelection}
        handleDeleteBook={onhandleDeleteBook}
      />
      {currentBook && <BookDetails book={currentBook} />}
      {isModalOpen && (
        <AddEditBookModal
          onClose={() => setIsModalOpen(false)}
          onSave={fetchBooks}
          editingBook={editingBook}
        />
      )}
    </div>
  );
};

export default App;
