const mongoose = require('mongoose');
const { Schema, model } = require("mongoose");

const AutoIncrement = require('mongoose-sequence')(mongoose);



const bookSchema = new Schema(
  {
    title: {
      type: String,
      required: true,
      lowercase: true,
      minLength: 5,
      maxLength: 25,
    },
    description: { type: String, required: true, minLength: 5, maxLength: 50 },
    rating: {
      type: Number,
      required: true,
      enum: [0, 1, 2, 3, 4, 5],
      default: 0,
    },
    price: { type: Number, required: true },
    pagesCount: { type: Number, required: true },
    reviewsCount: { type: Number, required: true, default: 0 },
    author: { type: String, required: true },
  },
  {
    toJSON: {
      transform: function (doc, ret, options) {
        delete ret._id;
        delete ret.__v;
        return ret;
      },
    },
  }
);

// add auto increment id
bookSchema.plugin(AutoIncrement, {inc_field: 'id'});

// Pre hook for `findOneAndUpdate`
// apply validation on update
bookSchema.pre('updateOne', function(next) {
  this.options.runValidators = true;
  next();
});


const Book = model("Book", bookSchema);

module.exports = Book;
