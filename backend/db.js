require('dotenv').config()
const mongoose=require('mongoose');



// It was showing error mongoose can't handle callback function...
// const connectToMongo=()=>{
//     mongoose.connect(mongoURI,()=>{
//         console.log("Connected to mongodb");
//     })
// }

const connectToMongo=()=>{

    mongoose.connect(process.env.REACT_APP_MONGO_URI).then(()=>{
        // console.log("Successfully connected to atlas")
    })
    // .catch((error)=>{console.log(error)})

    
}


module.exports=connectToMongo;