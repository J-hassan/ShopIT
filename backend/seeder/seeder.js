import mongoose from "mongoose";
import Product from "../models/product.js";
import products from "./data.js";

const seedProducts = async () => {

   try {

    await mongoose.connect("mongodb://localhost:27017/shopit");

    await Product.deleteMany();
    console.log("Products deleted");

    await Product.insertMany(products);
    console.log("Products added");

    process.exit();
    
   } catch (error) {
    
    console.log(error.message);
    process.exit();

   }

}

// invoke the function here
seedProducts();