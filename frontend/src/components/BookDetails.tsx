import React from "react";
import { BookI } from "../types/Book";
interface BookDetailsPropsInterface {
  book: BookI;
}
const BookDetails: React.FC<BookDetailsPropsInterface> = ({ book }) => {
  return (
    <div className="mt-4 p-4 bg-blue-100 rounded-lg">
      <h2 className="text-xl font-semibold">Selected Book</h2>
      <p>
        <strong>Title:</strong> {book.title}
      </p>
      <p>
        <strong>Author:</strong> {book.author}
      </p>
      <p>
        <strong>Genre:</strong> {book.genre}
      </p>
      <p>
        <strong>Published:</strong> {book.publishedDate}
      </p>
    </div>
  );
};

export default BookDetails;
