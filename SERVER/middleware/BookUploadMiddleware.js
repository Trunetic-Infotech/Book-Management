import multer from "multer";
import { CloudinaryStorage } from "multer-storage-cloudinary";
import cloudinary from "../util/Cloudinary.js";

// Setup CloudinaryStorage
const storage = new CloudinaryStorage({
  cloudinary,
  params: async (req, file) => {
    const ext = file.mimetype.split("/")[1].toLowerCase();
    let folder = "";
    let resource_type = "auto";

    if (ext === "pdf") {
      folder = "books";
      resource_type = "raw"; // for PDFs
    } else {
      folder = "Thumbnails"; // images folder
      resource_type = "image";
    }

    return {
      folder,
      format: ext,
      resource_type,
      public_id: file.originalname.split(".")[0] + "-" + Date.now(),
    };
  },
});

// File filter
const fileFilter = (req, file, cb) => {
  const allowedFormats = ["png", "jpg", "jpeg", "pdf"];
  const ext = file.mimetype.split("/")[1].toLowerCase();

  if (allowedFormats.includes(ext)) {
    cb(null, true);
  } else {
    cb(
      new Error(
        `Invalid file format: ${ext}. Only PNG, JPG, JPEG, and PDF are allowed.`
      ),
      false
    );
  }
};

const upload = multer({
  storage,
  fileFilter,
  limits: { fileSize: 10 * 1024 * 1024 },
}).fields([
  { name: "thumbnailImageFile", maxCount: 1 },
  { name: "bookPdfFile", maxCount: 1 },
]);

// ✅ Middleware wrapper to catch Multer errors
export const uploadFiles = (req, res, next) => {
  upload(req, res, (err) => {
    if (err) {
      console.error("Multer/Cloudinary error:", err);
      return res.status(400).json({
        success: false,
        message: err.message || "File upload failed",
      });
    }
    next();
  });
};
