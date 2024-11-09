const mongoose =require("mongoose")
mongoose.connect("mongodb+srv://vasanth:vasanth04@calendar.qa214.mongodb.net/?retryWrites=true&w=majority&appName=Calendar")
.then(() =>{
    console.log("mongoDB connected");
})
.catch(() =>{
    console.log("mongoDB connection failed");
})

