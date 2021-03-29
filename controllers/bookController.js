var Book = require("../models/book");
const ErrObject = require("../ErrorData");
const { ValidationError } = require("mongoose").Error;
const mongoose = require("mongoose");

//!
//! IMPORTANT Convert all promises to await =)
//!

// get all books

const allBooks=async (req,res,next)=>{
  const books=await Book.find({}).exec()
  res.send(books);
}

//get book by id

const getBook=async(req,res,next)=>{
  let book;
  try {
    book =await Book.findOne({id:req.params.id}).exec();
  } catch (error) {
    return next(ErrObject.internalServerError());
  }
  if(!book) return next(ErrObject.notFoundError());
  res.send(book)
}

// add new book
const postBook=async (req,res,next)=>{
  const book=new Book ({
    title:req.body.title,
    description:req.body.description,
    rating:req.body.rating,
    price:req.body.price,
    pagesCount:req.body.pagesCount,
    reviewsCount:req.body.reviewsCount,
    author:req.body.author
  })
try {
  await book.save()
  res.send(book);
} catch (error) {
  if(error instanceof mongoose.Error.ValidationError)return next(ErrObject.notAcceptableError(error.message));

  return next(ErrObject.internalServerError());
}
}









// put book by id
const putBook=async (req,res,next)=>{
  try {
    const book = await Book.findOne({id:req.params.id});
    if(!book) return next(ErrObject.notFoundError());
    await Book.updateOne({id:req.params.id},{
      title:req.body.title||book.title,
      description:req.body.description||book.description,
      rating:req.body.rating||book.rating,
      price:req.body.price||book.price,
      pagesCount:req.body.pagesCount||book.pagesCount,
      reviewsCount:req.body.reviewsCount||book.reviewsCount,
      author:req.body.author||book.author
    }).exec();
    res.send(`Your Book with Id ${book.id} has been Successfully updated`)
  } catch (error) {
    if(error instanceof mongoose.Error.ValidationError)return next(ErrObject.notAcceptableError(error.message));
    return next(ErrObject.internalServerError());
  }

}

// TODO not fully tested.
// delete book by id
const deleteBook = (req, res, next) => {
  Book.findOne({ id: req.params.id })
    .then((book) => {
      if (book == undefined)
        return next(ErrObject.notFoundError("Book Not found"));
    })
    .catch((err) => {
      return next(ErrObject.internalServerError());
    });

  Book.deleteOne({ id: req.params.id })
    .then(() => {
      return res.send(`Book with ID ${req.params.id} Deleted Successfully `);
    })
    .catch((err) => ErrObject.internalServerError());
};

module.exports = {
  allBooks,
  getBook,
  postBook,
  putBook,
  deleteBook,
};
