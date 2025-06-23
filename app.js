const express = require("express");
const app = express();
const mongoose = require("mongoose");
const Book = require("./models/book.js");
const path= require("path");
const methodOverride = require("method-override");
const ejsMate = require("ejs-mate");
const multer = require("multer");
const upload = multer({ dest: "uploads/" }); // For file uploads, if needed

const MONGO_URL = "mongodb+srv://p222333344444:DQRPC3jwxwdlXxs1@cluster0.ayjibmw.mongodb.net/bookstore?retryWrites=true&w=majority&appName=Cluster0";

main()
  .then(() => {
    console.log("connected to DB");
  })
  .catch((err) => {
    console.log(err);
  });

async function main() {
  await mongoose.connect(MONGO_URL);
}

app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));
app.use(express.urlencoded({ extended: true }));
app.use(methodOverride("_method"));
app.engine("ejs", ejsMate);
app.use(express.static(path.join(__dirname, "public")));

app.get("/",(req,res) =>{
    res.send("Hi there! Welcome to my  app.");
});

// index route
app.get("/books", async (req, res) => {
  const books = await Book.find({});
  res.render("books/index.ejs", { books });
});

// new route
app.get("/books/new", (req, res) => {
  res.render("books/new.ejs");
});

// show route
app.get("/books/:id", async (req, res) => {
 let{id}=req.params;
 const book= await Book.findById(id);
  res.render("books/show.ejs", { book });
});


//Create Route
app.post("/books", async (req, res) => {
  const newBook = new Book(req.body.book);
  await newBook.save();
  res.redirect("/books");
});


//Edit Route
app.get("/books/:id/edit", async (req, res) => {
  let { id } = req.params;
  const book = await Book.findById(id);
  res.render("books/edit.ejs", { book });
});

//Update Route
app.put("/books/:id", async (req, res) => {
  let { id } = req.params;
  await Book.findByIdAndUpdate(id, { ...req.body.book });
  res.redirect(`/books/${id}`);
});


//Delete Route
app.delete("/books/:id", async (req, res) => {
  let { id } = req.params;
  let deletedBook = await Book.findByIdAndDelete(id);
  console.log(deletedBook);
  res.redirect("/books");
});


// app.get("/testBook",async(req,res) =>{
//     let sampleBook=new Book({
//         title:"My first book",
//         description:"This is a sample book",
//         price:199,
//         author:"John Doe",
//     });
//     await sampleBook.save();
//     console.log("Sample saved successfully");
//     res.send("Sample book saved successfully");
// })

app.listen(8000,() =>{
    console.log("Server is running on port 8000");
});
