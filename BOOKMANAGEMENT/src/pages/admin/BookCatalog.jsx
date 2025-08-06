import React, { useState } from "react";
import Books from "../../assets/balbhartibook.jpg";

const BookCatalog = () => {
  const [selectedSubject, setSelectedSubject] = useState("All Books");

  const books = [
    {
      img: Books,
      subject: "Marathi",
      standard: "Std 5th",
      price: "₹150",
      availability: "In Stock",
    },
    {
      img: Books,
      subject: "English",
      standard: "Std 5th",
      price: "₹215",
      availability: "In Stock",
    },
    {
      img: Books,
      subject: "Mathematics",
      standard: "Std 5th",
      price: "₹270",
      availability: "Out of Stock",
    },
    {
      img: Books,
      subject: "Urdu",
      standard: "Std 5th",
      price: "₹121",
      availability: "In Stock",
    },
    {
      img: Books,
      subject: "Mathematics",
      standard: "Std 5th",
      price: "₹270",
      availability: "Out of Stock",
    },
    {
      img: Books,
      subject: "Urdu",
      standard: "Std 5th",
      price: "₹121",
      availability: "In Stock",
    },
    {
      img: Books,
      subject: "Marathi",
      standard: "Std 5th",
      price: "₹150",
      availability: "In Stock",
    },
    {
      img: Books,
      subject: "English",
      standard: "Std 5th",
      price: "₹215",
      availability: "In Stock",
    },
    {
      img: Books,
      subject: "Mathematics",
      standard: "Std 5th",
      price: "₹270",
      availability: "Out of Stock",
    },
    {
      img: Books,
      subject: "Urdu",
      standard: "Std 5th",
      price: "₹121",
      availability: "In Stock",
    },
    {
      img: Books,
      subject: "Mathematics",
      standard: "Std 5th",
      price: "₹270",
      availability: "Out of Stock",
    },
    {
      img: Books,
      subject: "Urdu",
      standard: "Std 5th",
      price: "₹121",
      availability: "In Stock",
    },
  ];

  const filteredItems =
    selectedSubject === "All Books"
      ? books
      : books.filter((book) =>
          book.subject.toLowerCase().includes(selectedSubject.toLowerCase())
        );
  return (
    <div className="p-4 flex flex-col gap-5 sm:p-6 md:p-8 lg:p-8 ">
      <div className="flex flex-wrap gap-4 sm:gap-8 md:gap-28 mb-6">
        {/* Subject Select */}
        <select
          value={selectedSubject}
          onChange={(e) => setSelectedSubject(e.target.value)}
          className="bg-gradient-to-r from-[#6A82C1] to-[#5A6FA7] text-black  px-4 py-2 rounded-lg border  shadow-md  "
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

        {/* Standard Select */}
        <select className="bg-gradient-to-r from-[#6A82C1] to-[#5A6FA7] text-black font-medium px-4 py-2 rounded-lg border border-white shadow-md ">
          <option>All Stds</option>
          <option>Std5th</option>
          <option>Std5th</option>
          <option>Std5th</option>
          <option>Std5th</option>
        </select>
      </div>

      <div className="flex justify-between mb-4">
        <div>
          <h2 className="text-xl font-bold">Book Catalog</h2>
          <h2>Manage available books for schools to purchase.</h2>
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-8 rounded-xl ">
        {filteredItems.map((book, index) => (
          <div
            key={index}
            className="rounded-2xl p-4 shadow-lg shadow-[#87878a] hover:shadow-2xl bg-gradient-to-b from-[#f0f4ff] to-white transition-transform hover:-translate-y-1 duration-300 border border-gray-200"
          >
            <div className="w-full flex flex-col items-center text-center gap-2">
              <img
                src={book.img}
                alt={book.subject}
                className="w-full h-[20vh] object-contain rounded-xl shadow-md mb-2"
              />

              <h2 className="text-lg font-bold text-[#2E3A59]">
                {book.subject}
              </h2>
              <p className="text-base font-medium text-gray-700">
                {book.standard}
              </p>
              <p className="text-base font-semibold text-gray-800">
                {book.price}
              </p>

              <span
                className={`mt-1 px-2 py-1 text-sm rounded-lg font-medium ${
                  book.availability === "In Stock"
                    ? "text-green-700 bg-green-100"
                    : "text-red-700 bg-red-100"
                }`}
              >
                {book.availability}
              </span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default BookCatalog;
