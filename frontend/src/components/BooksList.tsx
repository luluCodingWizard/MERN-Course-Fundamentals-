import React from "react";
import { BookI } from "../types/Book";

interface BookListPropsInterface {
  books: BookI[];
  handleSetCurrentBook: (book: BookI) => void;
  handleEditBook: (book: BookI) => void;
  handleDeleteBook: () => void;
}
const BooksList: React.FC<BookListPropsInterface> = ({
  books,
  handleSetCurrentBook,
  handleEditBook,
  handleDeleteBook,
}) => {
  return (
    <ul className="bg-white shadow rounded-lg">
      {books.map((book) => (
        <li
          key={book.id}
          className="mb-2 flex items-center justify-between p-2 border border-gray-300 rounded-md"
        >
          <div>
            <span className="font-medium">{book.title}</span>
            <span className="text-gray-500"> by {book.author}</span>
          </div>
          <div className="flex gap-2">
            <button
              className="px-3 py-1 text-sm bg-gray-300 hover:bg-gray-400 rounded-md"
              onClick={() => handleSetCurrentBook(book)}
            >
              Details
            </button>
            <button
              className="px-3 py-1 text-sm bg-blue-600 text-white hover:bg-blue-700 rounded-md"
              onClick={() => handleEditBook(book)}
            >
              Edit
            </button>
            <button
              className="px-3 py-1 text-sm bg-red-600 text-white hover:bg-red-700 rounded-md"
              onClick={() => handleDeleteBook()}
            >
              Delete
            </button>
          </div>
        </li>
      ))}
    </ul>
  );
};

export default BooksList;
