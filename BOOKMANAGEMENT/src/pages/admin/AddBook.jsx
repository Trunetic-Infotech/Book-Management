import React from "react";

const AddBook = () => {
  return (
    // <div className=" flex justify-center items-center    ">
    //   <div className="w-full flex justify-center px-4">
    //     <div className="bg-gradient-to-b from-[#2E3A59] via-[#6A82C1] to-[#5A6FA7] p-6 rounded-md w-full sm:w-[90%] md:w-[70%] lg:w-[30%] ">
    //       <h2 className="text-xl font-semibold mb-4 text-center text-white">
    //         Add New Book
    //       </h2>
    //       <form>
    //         <div className="mb-4">
    //           <label className="block text-sm font-medium text-white">Book Title</label>
    //           <input
    //             type="text"
    //             className="mt-1 block w-full px-4 py-2 border rounded-md"
    //             placeholder="Enter Book Title"
    //           />
    //         </div>
    //         <div className="mb-4">
    //           <label className="block text-sm font-medium text-white ">Author</label>
    //           <input
    //             type="text"
    //             className="mt-1 block w-full px-4 py-2 border rounded-md"
    //             placeholder="Enter Author Name"
    //           />
    //         </div>
    //         <div className="mb-4">
    //           <label className="block text-sm font-medium text-white">Upload Book</label>
    //           <input
    //             type="file"
    //             className="w-full px-4 py-2 border border-gray-300 rounded-md text-white"
    //           />
    //         </div>
    //         <div className="mb-4">
    //           <label className="block text-sm font-medium text-white">Subject</label>
    //           <select className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-md">
    //             <option>Select Subject</option>
    //             <option>English</option>
    //             <option>Marathi</option>
    //             <option>Urdu</option>
    //             <option>Hindi</option>
    //             <option>Mathematics</option>
    //             <option>History</option>
    //             <option>Geography</option>
    //             <option>Science</option>
    //           </select>
    //         </div>
    //         <div className="mb-4">
    //           <label className="block text-sm font-medium text-white">Grade</label>
    //           <select className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-md">
    //             <option>Grade</option>
    //             <option>Pre-Primary</option>
    //             <option>Primary</option>
    //             <option>Secondary</option>
    //             <option>Higher Secondary</option>
    //           </select>
    //         </div>
    //         <div className="mb-4">
    //           <label className="block text-sm font-medium text-white">Price</label>
    //           <input
    //             type="number"
    //             className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-md"
    //             placeholder="Enter Price"
    //           />
    //         </div>
    //         <div className="flex justify-between">
    //           <button
    //             type="button"
    //             className="bg-gray-500 text-white px-4 py-2 rounded-md"
    //           >
    //             Cancel
    //           </button>
    //           <button
    //             type="button"
    //             className="bg-blue-200  px-4 py-2 rounded-md shadow-lg"
    //           >
    //             Save
    //           </button>
    //         </div>
    //       </form>
    //     </div>
    //   </div>
    // </div>

    <div className=" flex items-center justify-center p-6 ">
      <div className="w-full max-w-2xl bg-gray-700 backdrop-blur-md rounded-xl shadow-xl p-8">
        <h2 className="text-2xl font-bold text-center text-white mb-6">
          📚 Add New Book
        </h2>
        <form className="space-y-5">
          {/* Book Title */}
          <div>
            <label className="block text-white font-medium text-sm mb-1">
              Book Title
            </label>
            <input
              type="text"
              placeholder="Enter Book Title"
              className="w-full px-4 py-2 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-300"
            />
          </div>

          {/* Author */}
          <div>
            <label className="block text-white font-medium text-sm mb-1">
              Author
            </label>
            <input
              type="text"
              placeholder="Enter Author Name"
              className="w-full px-4 py-2 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-300"
            />
          </div>

          {/* Upload */}
          <div>
            <label className="block text-white font-medium text-sm mb-1">
              Upload Book
            </label>
            <input
              type="file"
              className="w-full px-4 py-2 bg-white/30 text-white border border-gray-300 rounded-lg file:mr-4 file:py-2 file:px-4 file:rounded file:border-0 file:text-sm file:bg-blue-100 file:text-blue-800"
            />
          </div>

          {/* Subject */}
          <div>
            <label className="block text-white font-medium text-sm mb-1">
              Subject
            </label>
            <select className="w-full px-4 py-2 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-300">
              <option>Select Subject</option>
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

          {/* Grade */}
          <div>
            <label className="block text-white font-medium text-sm mb-1">
              Grade
            </label>
            <select className="w-full px-4 py-2 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-300">
              <option>Grade</option>
              <option>Pre-Primary</option>
              <option>Primary</option>
              <option>Secondary</option>
              <option>Higher Secondary</option>
            </select>
          </div>

          {/* Price */}
          <div>
            <label className="block text-white font-medium text-sm mb-1">
              Price
            </label>
            <input
              type="number"
              placeholder="Enter Price"
              className="w-full px-4 py-2 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-300"
            />
          </div>

          {/* Buttons */}
          <div className="flex justify-between mt-6">
            <button
              type="button"
              className="bg-gray-600 text-white px-6 py-2 rounded-md hover:bg-gray-700 transition"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="bg-white text-blue-800 font-semibold px-6 py-2 rounded-md shadow-lg hover:bg-blue-100 transition"
            >
              Save
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};
export default AddBook;
