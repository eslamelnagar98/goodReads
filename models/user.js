const { Schema, model, SchemaTypes } = require("mongoose");

const bcrypt = require("bcrypt");

const jwt = require("jsonwebtoken");
const util = require("util");

const signJwt = util.promisify(jwt.sign);
const verifyJwt = util.promisify(jwt.verify);

const userSchema = new Schema({
  userName: {
    type: String,
    required: true,
    lowercase: true,
    minLength: 5,
    maxLength: 15,
  },
  password: {
    type: String,
    required: true,
    minLength: 5,
  },
  favorites: [{ type: Schema.Types.ObjectId, ref: "Book" }],
});

// pre hook methods
const saltRounds = 8;

// hash password before saving
userSchema.pre("save", async function () {
  let currentDocument = this;

  if (currentDocument.isModified("password"))
    currentDocument.password = await bcrypt.hash(
      currentDocument.password,
      saltRounds
    );
});

// instance methods

userSchema.methods.verifyPassword = function (checkedPassword) {
  let currentDocument = this;
  return bcrypt.compare(checkedPassword, currentDocument.password);
};

const secretKey = "sdkgjlsfgjdlfgdsfg";

userSchema.methods.createToken = function () {
  const currentDocument = this;

  return signJwt({ id: currentDocument._id }, secretKey,{expiresIn: '1h'});
};





// statics methods

userSchema.statics.getUserFromToken = async function (token) {
  const User = this;

  const {id} = await verifyJwt(token,secretKey);

  const user = await User.findOne({_id:id});

  return user;

}

const User = model("User", userSchema);

module.exports = User;
