
const mongoose = require('mongoose');
const connectionDB = async () => {
   await mongoose.connect("mongodb+srv://erminspired:h4uglVF7ZlKygiGF@home.xynzrht.mongodb.net/namaste")}



module.exports = connectionDB;