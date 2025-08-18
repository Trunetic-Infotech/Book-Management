import express from "express";
import { addBookController, deleteBook, fetchAllBooks, fetchAllBooksForSchool, homePageDataController, updateBook } from "../controller/bookController.js";
import { uploadFiles } from "../middleware/BookUploadMiddleware.js";
import { requiredSignin } from "../middleware/Auth.js";



const router = express.Router();


router.post("/add-book", requiredSignin ,uploadFiles, addBookController);


router.get("/fetch-all-books",requiredSignin,fetchAllBooks )

router.delete('/delete-single-book/:id', (req, res, next) => {
  console.log('Delete book route hit for id:', req.params.id);
  next();
}, deleteBook);


router.put("/update-book/:id",requiredSignin,updateBook)



router.get("/fetch-all-books-for-school",fetchAllBooksForSchool )


router.get("/home-page-data",homePageDataController)





export default router;