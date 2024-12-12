import React, { useState } from "react";
import { BookI } from "../types/Book";
import { addBook, updateBook } from "../api/bookService";

type AddEditBookModalProps = {
  onClose: () => void;
  onSave: () => void; // Refreshes the book list
  editingBook?: BookI | null; // If provided, we're editing a book
};

const AddEditBookModal: React.FC<AddEditBookModalProps> = ({
  onClose,
  onSave,
  editingBook,
}) => {
  const [title, setTitle] = useState(editingBook?.title || "");
  const [author, setAuthor] = useState(editingBook?.author || "");
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    setIsLoading(true);

    try {
      if (editingBook) {
        // Update the existing book
        console.log(editingBook);
        await updateBook(editingBook["_id"], { title, author });
      } else {
        // Add a new book
        await addBook({ title, author });
      }

      onSave(); // Refresh the book list
      onClose(); // Close the modal
    } catch (error) {
      console.error("Error saving the book:", error);
      alert("Failed to save the book. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-gray-800 bg-opacity-50">
      <div className="bg-white p-6 rounded-md w-full max-w-lg shadow-lg">
        <h2 className="text-xl font-semibold mb-4">
          {editingBook ? "Edit Book" : "Add Book"}
        </h2>
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label
              htmlFor="title"
              className="block text-sm font-medium text-gray-700"
            >
              Title
            </label>
            <input
              type="text"
              id="title"
              className="mt-1 block w-full p-2 border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              required
            />
          </div>
          <div className="mb-4">
            <label
              htmlFor="author"
              className="block text-sm font-medium text-gray-700"
            >
              Author
            </label>
            <input
              type="text"
              id="author"
              className="mt-1 block w-full p-2 border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500"
              value={author}
              onChange={(e) => setAuthor(e.target.value)}
              required
            />
          </div>

          <div className="flex justify-end gap-2">
            <button
              type="button"
              className="px-4 py-2 text-sm bg-gray-200 hover:bg-gray-300 rounded-md"
              onClick={onClose}
              disabled={isLoading}
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-4 py-2 text-sm bg-indigo-600 text-white hover:bg-indigo-700 rounded-md"
              disabled={isLoading}
            >
              {isLoading ? "Saving..." : "Save"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AddEditBookModal;
