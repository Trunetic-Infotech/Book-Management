import React, { useEffect, useState } from "react";
import axios from "axios";
import { Pencil, Trash2 } from "lucide-react";
import Swal from "sweetalert2";

const BookCatalog = () => {
  const [selectedSubject, setSelectedSubject] = useState("All Books");
  const [books, setBooks] = useState([]);
  const [page, setPage] = useState(1);
  const [limit] = useState(4);
  const [total, setTotal] = useState(0);
  const [loading, setLoading] = useState(false);
  const [deletingId, setDeletingId] = useState(null);

  // NEW: Track which book is being edited
  const [editingId, setEditingId] = useState(null);
  // NEW: Controlled inputs for editing
  const [editTitle, setEditTitle] = useState("");
  const [editPrice, setEditPrice] = useState("");

  const fetchAllBooks = async () => {
    try {
      setLoading(true);
      const response = await axios.get(
        `${
          import.meta.env.VITE_URL
        }/books/fetch-all-books?page=${page}&limit=${limit}`,
        { withCredentials: true }
      );
      setBooks(response.data.data || []);
      setTotal(response.data.total || 0);
    } catch (error) {
      console.error("Error fetching books:", error);
    } finally {
      setLoading(false);
    }
  };

  const deleteBook = async (id) => {
    try {
      const response = await axios.delete(
        `${import.meta.env.VITE_URL}/books/delete-single-book/${id}`,
        { withCredentials: true }
      );

      if (response.data.success) {
        Swal.fire({
          icon: "success",
          title: "Deleted",
          text: "Book deleted successfully",
          timer: 1000,
          showConfirmButton: false,
        }).then(() => {
          setDeletingId(null);
          fetchAllBooks();
        });
      } else {
        Swal.fire({
          icon: "error",
          title: "Error",
          text: response.data.message || "Failed to delete book",
        });
        setDeletingId(null);
      }
    } catch (error) {
      console.error("Delete error:", error);
      Swal.fire({
        icon: "error",
        title: "Error",
        text: "Something went wrong while deleting the book",
      });
      setDeletingId(null);
    }
  };

  // NEW: API call to update book
  const updateBook = async (id, updatedData) => {
    try {
      const response = await axios.put(
        `${import.meta.env.VITE_URL}/books/update-book/${id}`,
        updatedData,
        { withCredentials: true }
      );

      if (response.data.success) {
        Swal.fire({
          icon: "success",
          title: "Updated",
          text: "Book updated successfully",
          timer: 1000,
          showConfirmButton: false,
        }).then(() => {
          setEditingId(null);
          fetchAllBooks();
        });
      } else {
        Swal.fire({
          icon: "error",
          title: "Error",
          text: response.data.message || "Failed to update book",
        });
      }
    } catch (error) {
      console.error("Update error:", error);
      Swal.fire({
        icon: "error",
        title: "Error",
        text: "Something went wrong while updating the book",
      });
    }
  };

  useEffect(() => {
    fetchAllBooks();
  }, [page]);

  const filteredItems =
    selectedSubject === "All Books"
      ? books
      : books.filter((book) =>
          book.subject?.toLowerCase().includes(selectedSubject.toLowerCase())
        );

  const totalPages = Math.ceil(total / limit);

  return (
    <div className="p-4 flex flex-col gap-5 sm:p-6 md:p-8 lg:p-8">
      {/* Filters */}
      <div className="flex flex-wrap gap-4 sm:gap-8 md:gap-28 mb-6">
        <select
          value={selectedSubject}
          onChange={(e) => setSelectedSubject(e.target.value)}
          className="bg-gradient-to-r from-[#7c90c0] to-[#90a1ce] text-black font-medium px-4 py-2 rounded-lg border border-white shadow-md"
        >
          <option>All Books</option>
          <option>English</option>
          <option>Marathi</option>
          <option>Urdu</option>
          <option>Hindi</option>
          <option>Mathematics</option>
          <option>History</option>
          <option>Geography</option>
          <option>Science</option>
        </select>
      </div>

      {/* Header */}
      <div className="flex justify-between mb-4">
        <div>
          <h2 className="text-xl font-bold">Book Catalog</h2>
          <h2>Manage available books for schools to purchase.</h2>
        </div>
      </div>

      {/* Books Grid */}
      {loading ? (
        <p>Loading books...</p>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8 rounded-xl">
          {filteredItems.map((book) => {
            const isDeleting = deletingId === book.id;
            const isEditing = editingId === book.id;

            return (
              <div
                key={book.bookId}
                onClick={() => {
                  if (book.downloadLink && !isEditing) {
                    window.open(
                      book.downloadLink,
                      "_blank",
                      "noopener,noreferrer"
                    );
                  } else if (!book.downloadLink && !isEditing) {
                    alert("No PDF available for this book");
                  }
                }}
                className="cursor-pointer rounded-2xl p-4 shadow-lg hover:shadow-2xl bg-gradient-to-b from-[#f0f4ff] to-white transition-transform hover:-translate-y-1 duration-300 border border-gray-200 relative"
              >
                <div
                  className={`relative w-full flex flex-col items-center text-center gap-2 ${
                    isDeleting ? "opacity-50 pointer-events-none" : ""
                  }`}
                >
                  {isDeleting && (
                    <div className="absolute inset-0 bg-black bg-opacity-50 flex flex-col justify-center items-center rounded-2xl z-10">
                      <svg
                        className="animate-spin h-8 w-8 mb-3 text-white"
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 24 24"
                      >
                        <circle
                          className="opacity-25"
                          cx="12"
                          cy="12"
                          r="10"
                          stroke="currentColor"
                          strokeWidth="4"
                        ></circle>
                        <path
                          className="opacity-75"
                          fill="currentColor"
                          d="M4 12a8 8 0 018-8v4a4 4 0 00-4 4H4z"
                        ></path>
                      </svg>
                      <p className="text-white font-semibold text-lg">
                        Deleting Book...
                      </p>
                    </div>
                  )}

                  {/* Action Icons */}
                  <div className="absolute top-2 right-2 flex gap-2 z-20">
                    {!isEditing && (
                      <Pencil
                        onClick={(e) => {
                          e.stopPropagation();
                          setEditingId(book.id);
                          setEditTitle(book.title);
                          setEditPrice(book.price);
                        }}
                        className="text-blue-600 hover:text-blue-400 cursor-pointer"
                      />
                    )}

                    <Trash2
                      onClick={(e) => {
                        e.stopPropagation();
                        setDeletingId(book.id);
                        deleteBook(book.id);
                      }}
                      className="text-red-600 hover:text-red-400 cursor-pointer"
                    />
                  </div>

                  {/* Book Image */}
                  <img
                    src={book.thumbnailImageUrl || "/placeholder.png"}
                    alt={book.title}
                    className="w-full h-[20vh] object-contain rounded-xl shadow-md mb-2"
                  />

                  {/* Book Info */}
                  {isEditing ? (
                    <>
                      <input
                        type="text"
                        value={editTitle}
                        onChange={(e) => setEditTitle(e.target.value)}
                        className="border border-gray-300 rounded-md px-3 py-1 w-full text-center mb-2"
                        placeholder="Edit title"
                      />
                      <input
                        type="number"
                        min="0"
                        step="0.01"
                        value={editPrice}
                        onChange={(e) => setEditPrice(e.target.value)}
                        className="border border-gray-300 rounded-md px-3 py-1 w-full text-center"
                        placeholder="Edit price"
                      />
                      {/* Buttons container below inputs */}
                      <div className="flex justify-center gap-4 mt-3 w-full">
                        <button
                          onClick={(e) => {
                            e.stopPropagation();
                            if (!editTitle.trim()) {
                              Swal.fire(
                                "Error",
                                "Title cannot be empty",
                                "error"
                              );
                              return;
                            }
                            if (isNaN(editPrice) || editPrice < 0) {
                              Swal.fire(
                                "Error",
                                "Price must be a valid number",
                                "error"
                              );
                              return;
                            }
                            updateBook(book.id, {
                              title: editTitle.trim(),
                              price: parseFloat(editPrice),
                            });
                          }}
                          className="bg-green-600 text-white px-4 py-1 rounded hover:bg-green-500 transition"
                        >
                          Save
                        </button>
                        <button
                          onClick={(e) => {
                            e.stopPropagation();
                            setEditingId(null);
                          }}
                          className="bg-red-600 text-white px-4 py-1 rounded hover:bg-red-500 transition"
                        >
                          Cancel
                        </button>
                      </div>
                    </>
                  ) : (
                    <>
                      <h2 className="text-lg font-bold text-[#2E3A59]">
                        {book.title}
                      </h2>
                      <p className="text-sm text-gray-600 italic">
                        by {book.author || "Unknown Author"}
                      </p>
                      <p className="text-base font-medium text-gray-700">
                        {book.subject} — {book.classLevel}
                      </p>
                      <p className="text-base font-semibold text-gray-800">
                        ₹{book.price}
                      </p>
                    </>
                  )}
                </div>
              </div>
            );
          })}
        </div>
      )}

      {/* Pagination */}
      {totalPages > 1 && (
        <div className="flex items-center justify-center gap-2 mt-8">
          <button
            onClick={() => setPage((p) => Math.max(p - 1, 1))}
            disabled={page === 1}
            className={`px-4 py-2 rounded-lg font-medium transition-all duration-200
              ${
                page === 1
                  ? "bg-gray-200 text-gray-500 cursor-not-allowed"
                  : "bg-blue-600 text-white hover:bg-blue-700 shadow-md"
              }`}
          >
            Prev
          </button>

          <div className="flex items-center gap-1">
            {Array.from({ length: totalPages }, (_, i) => i + 1).map((num) => (
              <button
                key={num}
                onClick={() => setPage(num)}
                className={`px-3 py-1 rounded-md transition-all duration-200
                  ${
                    page === num
                      ? "bg-blue-600 text-white shadow-md"
                      : "bg-gray-100 text-gray-700 hover:bg-blue-100"
                  }`}
              >
                {num}
              </button>
            ))}
          </div>

          <button
            onClick={() => setPage((p) => Math.min(p + 1, totalPages))}
            disabled={page === totalPages}
            className={`px-4 py-2 rounded-lg font-medium transition-all duration-200
              ${
                page === totalPages
                  ? "bg-gray-200 text-gray-500 cursor-not-allowed"
                  : "bg-blue-600 text-white hover:bg-blue-700 shadow-md"
              }`}
          >
            Next
          </button>
        </div>
      )}
    </div>
  );
};

export default BookCatalog;
