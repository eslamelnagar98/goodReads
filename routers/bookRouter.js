var express = require("express");

var bookRouter = express.Router();

var bookController = require("../controllers/bookController");
const authenticateUser = require("../middleware/authenticateUser");

bookRouter.get("/", bookController.allBooks);

bookRouter.get("/:id", bookController.getBook);

bookRouter.post("/", bookController.postBook);

bookRouter.put("/:id", bookController.putBook);

bookRouter.delete("/:id", bookController.deleteBook);

module.exports = bookRouter;
