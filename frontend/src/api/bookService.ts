import axios from "axios";
import { BookI } from "../types/Book";

// Base URL for the API
const API_URL = "http://localhost:4000"; // Replace with your backend URL

// Get all books
export const getBooks = async (): Promise<BookI[]> => {
  const response = await axios.get<BookI[]>(`${API_URL}/books`);
  return response.data;
};

// Add a new book
export const addBook = async (book: Omit<BookI, "id">): Promise<BookI> => {
  const response = await axios.post<BookI>(`${API_URL}/books`, book);
  return response.data;
};

// Update an existing book
export const updateBook = async (
  id: string,
  book: Partial<BookI>
): Promise<BookI> => {
  const response = await axios.put<BookI>(`${API_URL}/book/${id}`, book);
  return response.data;
};

// Delete a book
export const deleteBook = async (id: string): Promise<void> => {
  await axios.delete(`${API_URL}/book/${id}`);
};
