const mongoose=require("mongoose");
const Schema=mongoose.Schema;


const bookSchema = new Schema({
    title: {
      type: String,
      required: true,
    },
    description: String,
    image: {
      type: String,
      default:
        "https://res.cloudinary.com/bookbub/image/upload/t_ci_ar_6:9_padded,f_auto,q_auto,dpr_1/v1749031217/pro_pbid_5136374.jpg",
      set: (v) =>
        v === ""
          ? "https://res.cloudinary.com/bookbub/image/upload/t_ci_ar_6:9_padded,f_auto,q_auto,dpr_1/v1749031217/pro_pbid_5136374.jpg"
          : v,
    },
    price: Number,
    author: String,
   
  });

const Book=mongoose.model("Book",bookSchema);
module.exports=Book;