// import multer from "multer";
// import cloudinary from "../util/Cloudinary.js";

// const storage = multer.memoryStorage();

// const upload = multer({
//   storage,
//   fileFilter: (req, file, cb) => {
//     if (file.mimetype === "application/pdf") {
//       cb(null, true);
//     } else {
//       cb(new Error("Only PDF files are allowed"), false);
//     }
//   },
// });

// export const uploadPdf = upload.single("bookPdfFile");