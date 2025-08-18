import React, { useState } from "react";
import axios from "axios";
import Swal from "sweetalert2";

const AddBook = () => {
  const [formData, setFormData] = useState({
    bookId: "",
    title: "",
    author: "",
    publisher: "",
    isbn: "",
    edition: "",
    subject: "",
    classLevel: "",
    language: "",
    price: "",
    uploadDate: "",
    description: "",
   // replace dynamically as needed
  });

  const [thumbnailFile, setThumbnailFile] = useState(null);
  const [pdfFile, setPdfFile] = useState(null);

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [successMsg, setSuccessMsg] = useState(null);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleThumbnailChange = (e) => {
    setThumbnailFile(e.target.files[0]);
  };

  const handlePdfChange = (e) => {
    setPdfFile(e.target.files[0]);
  };

  const clearForm = () => {
    setFormData({
      bookId: "",
      title: "",
      author: "",
      publisher: "",
      isbn: "",
      edition: "",
      subject: "",
      classLevel: "",
      language: "",
      price: "",
      uploadDate: "",
      description: "",
      
    });
    setThumbnailFile(null);
    setPdfFile(null);
    setError(null);
    setSuccessMsg(null);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(null);
    setSuccessMsg(null);

    if (!thumbnailFile || !pdfFile) {
      setError("Please upload both thumbnail image and book PDF.");
      return;
    }

    setLoading(true);

    try {
      const data = new FormData();

      // Set uploadDate automatically here:
      const currentDate = new Date().toISOString().split("T")[0]; // e.g. "2025-08-11"

      // Append text fields
      Object.entries({ ...formData, uploadDate: currentDate }).forEach(
        ([key, value]) => {
          data.append(key, value);
        }
      );

      // Append files
      data.append("thumbnailImageFile", thumbnailFile);
      data.append("bookPdfFile", pdfFile);

      // **Log all FormData entries before sending:**
      for (let pair of data.entries()) {
        // For files, log name and size, for others log key:value
        if (pair[1] instanceof File) {
          console.log(`${pair[0]}:`, pair[1].name, pair[1].size, "bytes");
        } else {
          console.log(`${pair[0]}:`, pair[1]);
        }
      }

      const response = await axios.post(
        `${import.meta.env.VITE_URL}/books/add-book`,
        data, {
          withCredentials: true
        }
      );

      console.log(response);

      if (response.data.success) {
        Swal.fire({
          title: "Success!",
          text: "Book added successfully! 🎉",
          icon: "success",
          timer: 2000,
          showConfirmButton: false,
          // position: "top-end",
        });
        // setSuccessMsg("");
        clearForm();
      } else {
        console.log(response.data.message);
      }
    } catch (err) {
      setError(
        err.response?.data?.message || err.message || "Failed to add book."
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex items-center justify-center p-6">
      <div className="w-full max-w-3xl bg-gray-700 backdrop-blur-md rounded-xl shadow-xl p-8">
        <h2 className="text-2xl font-bold text-center text-white mb-6">
          📚 Add New Book
        </h2>

        {error && (
          <div className="mb-4 text-red-400 font-semibold text-center">
            {error}
          </div>
        )}
        {successMsg && (
          <div className="mb-4 text-green-400 font-semibold text-center">
            {successMsg}
          </div>
        )}

        <form
          className="grid grid-cols-1 md:grid-cols-2 gap-6"
          onSubmit={handleSubmit}
        >
          {/* Book ID */}
          <div>
            <label
              htmlFor="bookId"
              className="block text-white font-medium text-sm mb-1"
            >
              Book ID
            </label>
            <input
              id="bookId"
              name="bookId"
              type="text"
              placeholder="Enter Book ID (e.g. TBK20250811)"
              className="w-full px-4 py-2 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-300"
              required
              value={formData.bookId}
              onChange={handleChange}
            />
          </div>

          {/* Book Title */}
          <div>
            <label
              htmlFor="title"
              className="block text-white font-medium text-sm mb-1"
            >
              Book Title
            </label>
            <input
              id="title"
              name="title"
              type="text"
              placeholder="Enter Book Title"
              className="w-full px-4 py-2 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-300"
              required
              value={formData.title}
              onChange={handleChange}
            />
          </div>

          {/* Author */}
          <div>
            <label
              htmlFor="author"
              className="block text-white font-medium text-sm mb-1"
            >
              Author
            </label>
            <input
              id="author"
              name="author"
              type="text"
              placeholder="Enter Author Name"
              className="w-full px-4 py-2 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-300"
              required
              value={formData.author}
              onChange={handleChange}
            />
          </div>

          {/* Publisher */}
          <div>
            <label
              htmlFor="publisher"
              className="block text-white font-medium text-sm mb-1"
            >
              Publisher
            </label>
            <input
              id="publisher"
              name="publisher"
              type="text"
              placeholder="Enter Publisher Name"
              className="w-full px-4 py-2 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-300"
              value={formData.publisher}
              onChange={handleChange}
            />
          </div>

          {/* ISBN */}
          <div>
            <label
              htmlFor="isbn"
              className="block text-white font-medium text-sm mb-1"
            >
              ISBN
            </label>
            <input
              id="isbn"
              name="isbn"
              type="text"
              placeholder="Enter ISBN"
              className="w-full px-4 py-2 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-300"
              value={formData.isbn}
              onChange={handleChange}
            />
          </div>

          {/* Edition */}
          <div>
            <label
              htmlFor="edition"
              className="block text-white font-medium text-sm mb-1"
            >
              Edition
            </label>
            <input
              id="edition"
              name="edition"
              type="text"
              placeholder="Enter Edition (e.g. 3rd Edition)"
              className="w-full px-4 py-2 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-300"
              value={formData.edition}
              onChange={handleChange}
            />
          </div>

          {/* Subject */}
          <div>
            <label
              htmlFor="subject"
              className="block text-white font-medium text-sm mb-1"
            >
              Subject
            </label>
            <select
              id="subject"
              name="subject"
              className="w-full px-4 py-2 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-300"
              required
              value={formData.subject}
              onChange={handleChange}
            >
              <option value="">Select Subject</option>
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

          {/* Class Level */}
          <div>
            <label
              htmlFor="classLevel"
              className="block text-white font-medium text-sm mb-1"
            >
              Class Level
            </label>
            <select
              id="classLevel"
              name="classLevel"
              className="w-full px-4 py-2 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-300"
              required
              value={formData.classLevel}
              onChange={handleChange}
            >
              <option value="">Select Class Level</option>
              <option>Pre-Primary</option>
              <option>Primary</option>
              <option>Secondary</option>
              <option>Higher Secondary</option>
              <option>Class 10</option>
              <option>Class 12</option>
            </select>
          </div>

          {/* Language */}
          <div>
            <label
              htmlFor="language"
              className="block text-white font-medium text-sm mb-1"
            >
              Language
            </label>
            <input
              id="language"
              name="language"
              type="text"
              placeholder="Enter Language (e.g. English)"
              className="w-full px-4 py-2 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-300"
              value={formData.language}
              onChange={handleChange}
            />
          </div>

          {/* Price */}
          <div>
            <label
              htmlFor="price"
              className="block text-white font-medium text-sm mb-1"
            >
              Price (INR)
            </label>
            <input
              id="price"
              name="price"
              type="number"
              placeholder="Enter Price"
              className="w-full px-4 py-2 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-300"
              min={0}
              step="0.01"
              required
              value={formData.price}
              onChange={handleChange}
            />
          </div>

          {/* Description (full width) */}
          <div className="md:col-span-2">
            <label
              htmlFor="description"
              className="block text-white font-medium text-sm mb-1"
            >
              Description
            </label>
            <textarea
              id="description"
              name="description"
              placeholder="Enter Book Description"
              rows={4}
              className="w-full px-4 py-2 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-300 resize-none"
              value={formData.description}
              onChange={handleChange}
            />
          </div>

          {/* Thumbnail Image Upload */}
          <div>
            <label
              htmlFor="thumbnailImageFile"
              className="block text-white font-medium text-sm mb-1"
            >
              Upload Thumbnail Image
            </label>
            <input
              id="thumbnailImageFile"
              name="thumbnailImageFile"
              type="file"
              accept="image/*"
              className="w-full px-4 py-2 bg-white/30 text-white border border-gray-300 rounded-lg file:mr-4 file:py-2 file:px-4 file:rounded file:border-0 file:text-sm file:bg-blue-100 file:text-blue-800"
              onChange={handleThumbnailChange}
              required
            />
          </div>

          {/* Book PDF Upload */}
          <div>
            <label
              htmlFor="bookPdfFile"
              className="block text-white font-medium text-sm mb-1"
            >
              Upload Book File (PDF)
            </label>
            <input
              id="bookPdfFile"
              name="bookPdfFile"
              type="file"
              accept=".pdf"
              className="w-full px-4 py-2 bg-white/30 text-white border border-gray-300 rounded-lg file:mr-4 file:py-2 file:px-4 file:rounded file:border-0 file:text-sm file:bg-blue-100 file:text-blue-800"
              onChange={handlePdfChange}
              required
            />
          </div>

          {/* Admin ID (hidden) */}
          <input
            id="admin_id"
            name="admin_id"
            type="hidden"
            value={formData.admin_id}
          />

          {/* Buttons (full width) */}
          <div className="md:col-span-2 flex justify-between mt-6">
            <button
              type="button"
              className="bg-gray-600 text-white px-6 py-2 rounded-md hover:bg-gray-700 transition"
              onClick={clearForm}
              disabled={loading}
            >
              Cancel
            </button>
            <button
              type="submit"
              className={`bg-white text-blue-800 font-semibold px-6 py-2 rounded-md shadow-lg hover:bg-blue-100 transition ${
                loading ? "opacity-50 cursor-not-allowed" : ""
              }`}
              disabled={loading}
            >
              {loading ? "Saving..." : "Save"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AddBook;
